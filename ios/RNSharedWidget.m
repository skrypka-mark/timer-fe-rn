//
//  RNSharedWidget.m
//  WidgetTest
//
//  Created by Mark Skrypka on 24.05.2023.
//

#import <Foundation/Foundation.h>
#import "RNSharedWidget.h"
#import "Timer-Swift.h"

@implementation RNSharedWidget

NSUserDefaults *sharedDefaults;
NSString *appGroup = @"group.eventTimer";

-(dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE(RNSharedWidget)

RCT_EXPORT_METHOD(setWidgetData: (NSString *)key: (NSString *)data: (RCTResponseSenderBlock)callback) {
  sharedDefaults = [[NSUserDefaults alloc]initWithSuiteName:appGroup];
  
  if(sharedDefaults == nil) {
    callback(@[@0]);
    return;
  }
  
  [sharedDefaults setValue:data forKey:key];
  if (@available(iOS 14.0, *)) {
    [WidgetKitHelper reloadAllTimelines];
  } else {
    // Fallback on earlier versions
  }
  callback(@[[NSNull null]]);
}

@end
