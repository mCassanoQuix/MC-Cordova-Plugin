declare global {
  interface Window {
    cordova: any;
    plugins: any;
  }
}

/**
 * @prop {string} alert - The alert text of the notification message.
 * @prop {string} [title] - The title text of the notification message.
 * @prop {string} [url] - The url associated with the notification message. This can be either a cloud-page url or an open-direct url.
 * @prop {string} type - Indicates the type of notification message. Possible values: 'cloudPage', 'openDirect' or 'other'
 */
export declare interface NotificationOpenedCallbackValues {
  alert: string;
  type: "cloudPage" | "openDirect" | "other";
  title?: string;
  url?: string;
}

/**
 * @param {number} timeStamp - Time since epoch when the push message was opened.
 * @param {NotificationOpenedCallbackValues} values - The values of the notification message.
 */
export declare type NotificationOpenedCallback = (
  timeStamp: number,
  values: NotificationOpenedCallbackValues
) => void;

/**
 * @param {string} url - The url associated with the action taken by the user.
 */
export declare type UrlActionCallback = (url: string) => void;

export declare interface MCCordovaPlugin {
  /**
   * Initialize the Marketing Cloud SDK programmatically
   * @param {Object} config
   * @param {function} successCallback
   * @param {function} [errorCallback]
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-Android/javadocs/MarketingCloudSdk/8.0/com.salesforce.marketingcloud/-marketing-cloud-config/index.html | Android Docs}
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-iOS/appledoc/Classes/MarketingCloudSDK.html#//api/name/sfmc_configureWithDictionary:error: | iOS Docs}
   */
  init(
    config: Object,
    successCallback: () => void,
    errorCallback: () => void
  ): void;

  /**
   * Request the user permission (iOS only)
   * @param {function} successCallback
   * @param {function} [errorCallback]
   */
  requestPushPermission(
    successCallback: () => void,
    errorCallback: () => void
  ): void;

  /**
   * Enable location
   * @param  {function} successCallback
   * @param  {function} [errorCallback]
   */
  enableLocation(successCallback: () => void, errorCallback: () => void): void;

  /**
   * Disable location
   * @param  {function} successCallback
   * @param  {function} [errorCallback]
   */
  disableLocation(successCallback: () => void, errorCallback: () => void): void;

  /**
   * The current state of the location flag in the native Marketing Cloud SDK.
   * @param  {function(enabled)} successCallback
   * @param  {boolean} successCallback.enabled - Whether location is enabled.
   * @param  {function} [errorCallback]
   */
  isLocationEnabled(
    successCallback: (enabled: boolean) => void,
    errorCallback: () => void
  ): void;
  /**
   * The current state of the pushEnabled flag in the native Marketing Cloud SDK.
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-Android/javadocs/MarketingCloudSdk/6.4/reference/com/salesforce/marketingcloud/messages/push/PushMessageManager.html#isPushEnabled() | Android Docs}
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-iOS/appledoc/Classes/MarketingCloudSDK.html#//api/name/sfmc_pushEnabled | iOS Docs}
   */
  isPushEnabled(
    successCallBack: (enabled: boolean) => void,
    errorCallBack: () => void
  ): void;
  /**
   * Enables push messaging in the native Marketing Cloud SDK.
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-Android/javadocs/MarketingCloudSdk/6.4/reference/com/salesforce/marketingcloud/messages/push/PushMessageManager.html#enablePush() | Android Docs}
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-iOS/appledoc/Classes/MarketingCloudSDK.html#//api/name/sfmc_setPushEnabled: | iOS Docs}
   */
  enablePush(successCallBack: () => void, errorCallBack: () => void): void;
  /**
   * Disables push messaging in the native Marketing Cloud SDK.
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-Android/javadocs/MarketingCloudSdk/6.4/reference/com/salesforce/marketingcloud/messages/push/PushMessageManager.html#disablePush() | Android Docs}
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-iOS/appledoc/Classes/MarketingCloudSDK.html#//api/name/sfmc_setPushEnabled: | iOS Docs}
   */
  disablePush(successCallback: () => void, errorCallback: () => void): void;
  /**
   * Returns the token used by the Marketing Cloud to send push messages to the device.
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-Android/javadocs/MarketingCloudSdk/6.4/reference/com/salesforce/marketingcloud/messages/push/PushMessageManager.html#getPushToken() | Android Docs}
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-iOS/appledoc/Classes/MarketingCloudSDK.html#//api/name/sfmc_deviceToken | iOS Docs}
   */
  getSystemToken(
    successCallback: (token: string) => void,
    errorCallback: () => void
  ): void;
  /**
   * Returns the maps of attributes set in the registration.
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-Android/javadocs/MarketingCloudSdk/6.4/reference/com/salesforce/marketingcloud/registration/RegistrationManager.html#getAttributes() | Android Docs}
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-iOS/appledoc/Classes/MarketingCloudSDK.html#//api/name/sfmc_attributes | iOS Docs}
   */
  getAttributes(
    successCallback: (attributes: { [key: string]: string }) => void,
    errorCallback: () => void
  ): void;
  /**
   * Sets the value of an attribute in the registration.
   * @param  {string} key - The name of the attribute to be set in the registration.
   * @param  {string} value - The value of the `key` attribute to be set in the registration.
   * @param  {function(saved)} [successCallback]
   * @param  {boolean} successCallback.saved - Whether the attribute value was set in the registration.
   * @param  {function} [errorCallback]
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-Android/javadocs/MarketingCloudSdk/6.4/reference/com/salesforce/marketingcloud/registration/RegistrationManager.Editor.html#setAttribute(java.lang.String,%20java.lang.String) | Android Docs}
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-iOS/appledoc/Classes/MarketingCloudSDK.html#//api/name/sfmc_setAttributeNamed:value: | iOS Docs}
   */
  setAttribute(
    key: string,
    value: string,
    successCallback: (saved: boolean) => void,
    errorCallback: () => void
  ): void;
  /**
   * Clears the value of an attribute in the registration.
   * @param  {string} key - The name of the attribute whose value should be cleared from the registration.
   * @param  {function(saved)} [successCallback]
   * @param  {boolean} successCallback.saved - Whether the value of the `key` attribute was cleared from the registration.
   * @param  {function} [errorCallback]
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-Android/javadocs/MarketingCloudSdk/6.4/reference/com/salesforce/marketingcloud/registration/RegistrationManager.Editor.html#clearAttribute(java.lang.String) | Android Docs}
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-iOS/appledoc/Classes/MarketingCloudSDK.html#//api/name/sfmc_clearAttributeNamed: | iOS Docs}
   */
  clearAttribute(
    key: string,
    successCallback: (saved: boolean) => void,
    errorCallback: () => void
  ): void;
  /**
   * @param  {string} tag - The tag to be added to the list of tags in the registration.
   * @param  {function(saved)} [successCallback]
   * @param  {boolean} successCallback.saved - Whether the value passed in for `tag` was saved in the registration.
   * @param  {function} [errorCallback]
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-Android/javadocs/MarketingCloudSdk/6.4/reference/com/salesforce/marketingcloud/registration/RegistrationManager.Editor.html#addTag(java.lang.String) | Android Docs}
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-iOS/appledoc/Classes/MarketingCloudSDK.html#//api/name/sfmc_addTag: | iOS Docs}
   */
  addTag(
    tag: string,
    successCallback: (saved: boolean) => void,
    errorCallback: () => void
  ): void;
  /**
   * @param  {string} tag - The tag to be removed from the list of tags in the registration.
   * @param  {function(saved)} [successCallback]
   * @param  {boolean} successCallback.saved - Whether the value passed in for `tag` was cleared from the registration.
   * @param  {function} [errorCallback]
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-Android/javadocs/MarketingCloudSdk/6.4/reference/com/salesforce/marketingcloud/registration/RegistrationManager.Editor.html#removeTag(java.lang.String) | Android Docs}
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-iOS/appledoc/Classes/MarketingCloudSDK.html#//api/name/sfmc_removeTag: | iOS Docs}
   */
  removeTag(
    tag: string,
    successCallback: (saved: boolean) => void,
    errorCallback: () => void
  ): void;
  /**
   * Returns the tags currently set on the device.
   * @param  {function(tags)} successCallback
   * @param  {string[]} successCallback.tags - The array of tags currently set in the native SDK.
   * @param  {function} [errorCallback]
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-Android/javadocs/MarketingCloudSdk/6.4/reference/com/salesforce/marketingcloud/registration/RegistrationManager.html#getTags() | Android Docs}
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-iOS/appledoc/Classes/MarketingCloudSDK.html#//api/name/sfmc_tags | iOS Docs}
   */
  getTags(
    successCallback: (tags: string[]) => void,
    errorCallback: () => void
  ): void;
  /**
   * Sets the contact key for the device's user.
   * @param  {string} contactKey - The value to be set as the contact key of the device's user.
   * @param  {function(saved)} [successCallback]
   * @param  {boolean} successCallback.saved - Whether the value passed in for `contactKey` was saved in the registration.
   * @param  {function} [errorCallback]
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-Android/javadocs/MarketingCloudSdk/6.4/reference/com/salesforce/marketingcloud/registration/RegistrationManager.Editor.html#setContactKey(java.lang.String) | Android Docs}
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-iOS/appledoc/Classes/MarketingCloudSDK.html#//api/name/sfmc_setContactKey: | iOS Docs}
   */
  setContactKey(
    contactKey: string,
    successCallback: (saved: boolean) => void,
    errorCallback: () => void
  ): void;
  /**
   * Returns the contact key currently set on the device.
   * @param  {function(contactKey)} successCallback
   * @param  {string} successCallback.contactKey - The current contact key.
   * @param  {function} [errorCallback]
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-Android/javadocs/MarketingCloudSdk/6.4/reference/com/salesforce/marketingcloud/registration/RegistrationManager.html#getContactKey() | Android Docs}
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-iOS/appledoc/Classes/MarketingCloudSDK.html#//api/name/sfmc_contactKey | iOS Docs}
   */
  getContactKey(
    successCallback: (contactKey: string) => void,
    errorCallback: () => void
  ): void;
  /**
   * Enables verbose logging within the native Marketing Cloud SDK.
   * @param  {function} [successCallback]
   * @param  {function} [errorCallback]
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-Android/javadocs/MarketingCloudSdk/6.4/reference/com/salesforce/marketingcloud/MarketingCloudSdk.html#setLogLevel(int) | Android Docs}
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-iOS/appledoc/Classes/MarketingCloudSDK.html#//api/name/sfmc_setDebugLoggingEnabled: | iOS Docs}
   */
  enableVerboseLogging(
    successCallback: () => void,
    errorCallback: () => void
  ): void;
  /**
   * Disables verbose logging within the native Marketing Cloud SDK.
   * @param  {function} [successCallback]
   * @param  {function} [errorCallback]
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-Android/javadocs/MarketingCloudSdk/6.4/reference/com/salesforce/marketingcloud/MarketingCloudSdk.html#setLogLevel(int) | Android Docs}
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-iOS/appledoc/Classes/MarketingCloudSDK.html#//api/name/sfmc_setDebugLoggingEnabled: | iOS Docs}
   */
  disableVerboseLogging(
    successCallback: () => void,
    errorCallback: () => void
  ): void;
  /**
   * @param {function(event)} notificationOpenedListener
   * @param {MCCordovaPlugin~notificationOpenedCallback} notificationOpenedListener.event
   * @since 6.1.0
   */
  setOnNotificationOpenedListener(
    notificationOpenedListener: NotificationOpenedCallback
  ): void;
  /**
   * @param {function(event)} urlActionListener
   * @param {UrlActionCallback} urlActionListener.event
   * @since 6.3.0
   */
  setOnUrlActionListener(urlActionListener: UrlActionCallback): void;
  /**
   * Instructs the native SDK to log the SDK state to the native logging system (Logcat for
   * Android and Xcode/Console.app for iOS).  This content can help diagnose most issues within
   * the SDK and will be requested by the Marketing Cloud support team.
   *
   * @param  {function} [successCallback]
   * @param  {function} [errorCallback]
   * @since 6.3.1
   */
  logSdkState(successCallback: () => void, errorCallback: () => void): void;
  /**
   * Method to track events, which could result in actions such as an InApp Message being
   * displayed.
   * @param  {string} eventName - The name of the event to be tracked.
   * @param  {string} attributesMap - key-value pairs of attributes associated with the Event.
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-Android/javadocs/MarketingCloudSdk/7.4/com.salesforce.marketingcloud.events/-event-manager/custom-event.html | Android Docs}
   * @see  {@link https://salesforce-marketingcloud.github.io/MarketingCloudSDK-iOS/appledoc/Classes/SFMCEvent.html#/c:objc(cs)SFMCEvent(cm)customEventWithName:withAttributes: | iOS Docs}
   */
  track(eventName: string, attributesMap: string): void;
}
declare const MCCordovaPlugin: MCCordovaPlugin;
export default MCCordovaPlugin;
