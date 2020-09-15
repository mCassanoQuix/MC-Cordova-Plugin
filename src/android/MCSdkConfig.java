/**
 * Copyright 2018 Salesforce, Inc
 * <p>
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the following conditions are met:
 * <p>
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * <p>
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of
 * conditions and the following disclaimer in the documentation and/or other materials provided
 * with the distribution.
 * <p>
 * 3. Neither the name of the copyright holder nor the names of its contributors may be used to
 * endorse or promote products derived from this software without specific prior written permission.
 * <p>
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
package com.salesforce.marketingcloud.cordova;

import static com.salesforce.marketingcloud.cordova.MCCordovaPlugin.TAG;

import android.content.Context;
import android.content.res.Resources;
import android.content.res.XmlResourceParser;
import android.util.Log;
import androidx.annotation.Nullable;
import com.google.firebase.FirebaseApp;
import com.salesforce.marketingcloud.MarketingCloudConfig;
import com.salesforce.marketingcloud.notifications.NotificationCustomizationOptions;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Locale;

import org.json.JSONException;
import org.json.JSONObject;
import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;

public class MCSdkConfig {
    private static final String CONFIG_PREFIX = "com.salesforce.marketingcloud.";

    private MCSdkConfig() {}

    private static String readFromFile(Context context) {

        String ret = "";

        try {
            InputStream inputStream = context.openFileInput("mc_config.json");

            if ( inputStream != null ) {
                InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
                BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
                String receiveString = "";
                StringBuilder stringBuilder = new StringBuilder();

                while ( (receiveString = bufferedReader.readLine()) != null ) {
                    stringBuilder.append(receiveString);
                }

                inputStream.close();
                ret = stringBuilder.toString();
            }
        }
        catch (FileNotFoundException e) {
            Log.e("login activity", "File not found: " + e.toString());
        } catch (IOException e) {
            Log.e("login activity", "Can not read file: " + e.toString());
        }

        return ret;
    }

    @Nullable
    public static MarketingCloudConfig.Builder prepareConfigBuilder(Context context) {
        // Read mc_config.json
        String mcConfig = readFromFile(context);
        if (!mcConfig.isEmpty()) {
            try {
                JSONObject config = new JSONObject(mcConfig);
                return parseJSONConfig(context, config);
            } catch (JSONException e) {
                Log.e(TAG, "Unable to load mc_config.xml", e);
            }
        }

        // Read config.xml
        Resources res = context.getResources();
        int configId = res.getIdentifier("config", "xml", context.getPackageName());

        if (configId == 0) {
            return null;
        }

        XmlResourceParser parser = res.getXml(configId);

        return parseConfig(context, parser);
    }

    static MarketingCloudConfig.Builder parseConfig(Context context, XmlPullParser parser) {
        MarketingCloudConfig.Builder builder = MarketingCloudConfig.builder();
        boolean senderIdSet = false;
        try {
            while (parser.next() != XmlPullParser.END_DOCUMENT) {
                if (parser.getEventType() != XmlPullParser.START_TAG
                    || !"preference".equals(parser.getName())) {
                    continue;
                }

                String key = parser.getAttributeValue(null, "name");
                String val = parser.getAttributeValue(null, "value");

                if (key != null && val != null) {
                    key = key.toLowerCase(Locale.US);

                    switch (key) {
                        case CONFIG_PREFIX + "app_id":
                            builder.setApplicationId(val);
                            break;
                        case CONFIG_PREFIX + "access_token":
                            builder.setAccessToken(val);
                            break;
                        case CONFIG_PREFIX + "sender_id":
                            builder.setSenderId(val);
                            senderIdSet = true;
                            break;
                        case CONFIG_PREFIX + "analytics":
                            builder.setAnalyticsEnabled("true".equalsIgnoreCase(val));
                            break;
                        case CONFIG_PREFIX + "notification_small_icon":
                            int notifId = context.getResources().getIdentifier(
                                val, "drawable", context.getPackageName());
                            if (notifId != 0) {
                                builder.setNotificationCustomizationOptions(
                                    NotificationCustomizationOptions.create(notifId));
                            }
                            break;
                        case CONFIG_PREFIX + "tenant_specific_endpoint":
                            builder.setMarketingCloudServerUrl(val);
                            break;
                        case CONFIG_PREFIX + "delay_registration_until_contact_key_is_set":
                            builder.setDelayRegistrationUntilContactKeyIsSet(
                                "true".equalsIgnoreCase(val));
                            break;
                        case CONFIG_PREFIX + "location_enabled":
                            builder.setGeofencingEnabled("true".equalsIgnoreCase(val));
                            break;
                    }
                }
            }
        } catch (XmlPullParserException e) {
            Log.e(TAG, "Unable to read config.xml.", e);
        } catch (IOException ioe) {
            Log.e(TAG, "Unable to open config.xml.", ioe);
        }

        if (!senderIdSet) {
            try {
                builder.setSenderId(FirebaseApp.getInstance().getOptions().getGcmSenderId());
            } catch (Exception e) {
                Log.e(TAG,
                    "Unable to retrieve sender id.  Push messages will not work for Marketing Cloud.",
                    e);
            }
        }

        return builder;
    }

    static MarketingCloudConfig.Builder parseJSONConfig(Context context, JSONObject config) {
        MarketingCloudConfig.Builder builder = MarketingCloudConfig.builder();
        boolean senderIdSet = false;
        try {
            builder.setApplicationId(config.getString("app_id"));
            builder.setAccessToken(config.getString("access_token"));
            builder.setMarketingCloudServerUrl(config.getString("tenant_specific_endpoint"));
            builder.setAnalyticsEnabled("true".equalsIgnoreCase(config.getString("analytics")));
            builder.setDelayRegistrationUntilContactKeyIsSet("true".equalsIgnoreCase(config.getString("delay_registration_until_contact_key_is_set")));
            builder.setGeofencingEnabled("true".equalsIgnoreCase(config.getString("location_enabled")));

            int notifId = context.getResources().getIdentifier(config.getString("notification_small_icon"), "drawable", context.getPackageName());
            if (notifId != 0) {
                builder.setNotificationCustomizationOptions(NotificationCustomizationOptions.create(notifId));
            }

        } catch (JSONException e) {

            Log.e(TAG, "Unable to read mc_config.json.", e);

        }

        try {
            builder.setSenderId(FirebaseApp.getInstance().getOptions().getGcmSenderId());
        } catch (Exception e) {
            Log.e(TAG, "Unable to retrieve sender id.  Push messages will not work for Marketing Cloud.", e);
        }

        return builder;
    }
}