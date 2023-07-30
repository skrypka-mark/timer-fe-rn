//
//  RNSharedWidget.h
//  WidgetTest
//
//  Created by Mark Skrypka on 24.05.2023.
//

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

@interface RNSharedWidget : NSObject<RCTBridgeModule>

@end
