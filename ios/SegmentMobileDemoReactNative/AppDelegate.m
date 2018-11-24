/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Analytics/SEGAnalytics.h>
#import <React/RCTPushNotificationManager.h>
#import <AdSupport/ASIdentifierManager.h>

#import "SEGAppboyIntegrationFactory.h"
#import "Appboy.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"SegmentMobileDemoReactNative"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  // Get the IDFA and log it...for debugging purposes
  NSString *idfaString = [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
  NSLog(@"*** IDFA ***");
  NSLog(idfaString);
  NSLog(@"************");
  
  if ([[UIApplication sharedApplication] respondsToSelector:@selector(registerForRemoteNotifications)]) {
    UIUserNotificationType types = UIUserNotificationTypeAlert | UIUserNotificationTypeSound |
    UIUserNotificationTypeBadge;
    UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:types
                                                                             categories:nil];
    [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
    [[UIApplication sharedApplication] registerForRemoteNotifications];
  } else {
    UIRemoteNotificationType types = UIRemoteNotificationTypeAlert | UIRemoteNotificationTypeSound |
    UIRemoteNotificationTypeBadge;
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:types];
  }
  
  return YES;
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
  [[SEGAnalytics sharedAnalytics] receivedRemoteNotification:userInfo];
  NSLog(@"********************** GOT PUSH ************************");
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
  if ([Appboy sharedInstance] == nil) {
    [[SEGAppboyIntegrationFactory instance] saveRemoteNotification:userInfo];
  }
  [[SEGAnalytics sharedAnalytics] receivedRemoteNotification:userInfo];
  //completionHandler(UIBackgroundFetchResultNoData);
  NSLog(@"********************** GOT PUSH ************************");
  [RCTPushNotificationManager didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  NSLog(@"********************** REGISTERED FOR PUSH ************************");
  [[SEGAnalytics sharedAnalytics] registeredForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
  // register to receive notifications
  [application registerForRemoteNotifications];
}

// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  NSLog(@"********************** PUSH REGISTRATION FAILED ************************");
  [RCTPushNotificationManager didFailToRegisterForRemoteNotificationsWithError:error];
}

- (void)application:(UIApplication *)application handleActionWithIdentifier:(NSString *)identifier forRemoteNotification:(NSDictionary *)userInfo completionHandler:(void (^)())completionHandler
{
  /*if ([Appboy sharedInstance] == nil) {
    [[SEGAppboyIntegrationFactory instance] saveRemoteNotification:userInfo];
  }
  [[SEGAnalytics sharedAnalytics] handleActionWithIdentifier:identifier forRemoteNotification:userInfo];
  completionHandler();*/
}

- (void)setupPushCategories {
  UIMutableUserNotificationAction *likeAction = [[UIMutableUserNotificationAction alloc] init];
  likeAction.identifier = @"FOREGROUND_IDENTIFIER";
  likeAction.title = @"Foreground";
  likeAction.activationMode = UIUserNotificationActivationModeForeground;
  likeAction.destructive = NO;
  likeAction.authenticationRequired = NO;
  
  UIMutableUserNotificationAction *unlikeAction = [[UIMutableUserNotificationAction alloc] init];
  unlikeAction.identifier = @"BACKGROUND_IDENTIFIER";
  unlikeAction.title = @"Background";
  unlikeAction.activationMode = UIUserNotificationActivationModeBackground;
  unlikeAction.destructive = NO;
  unlikeAction.authenticationRequired = NO;
  
  UIMutableUserNotificationCategory *likeCategory = [[UIMutableUserNotificationCategory alloc] init];
  likeCategory.identifier = @"SEGMENT_CATEGORY";
  [likeCategory setActions:@[likeAction, unlikeAction] forContext:UIUserNotificationActionContextDefault];
  
  NSSet *categories = [NSSet setWithObjects:likeCategory, nil];
  UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:(UIUserNotificationTypeBadge|UIUserNotificationTypeAlert | UIUserNotificationTypeSound) categories:categories];
  [[UIApplication sharedApplication] registerForRemoteNotifications];
  [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
}

@end
