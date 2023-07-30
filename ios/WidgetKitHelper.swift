//
//  WidgetKitHelper.swift
//  WidgetTest
//
//  Created by Mark Skrypka on 24.05.2023.
//

import WidgetKit

@available(iOS 14.0, *)
@objcMembers final class WidgetKitHelper: NSObject {
  class func reloadAllTimelines() {
    #if arch(arm64) || arch(i386) || arch(x86_64)
      WidgetCenter.shared.reloadAllTimelines()
    #endif
  }
}
