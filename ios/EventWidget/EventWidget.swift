//
//  EventWidget.swift
//  EventWidget
//
//  Created by Mark Skrypka on 24.05.2023.
//

import WidgetKit
import SwiftUI
import Intents

extension UIImage {
  func resized(toWidth width: CGFloat, isOpaque: Bool = true) -> UIImage? {
    let canvas = CGSize(width: width, height: CGFloat(ceil(width/size.width * size.height)))
    let format = imageRendererFormat
    format.opaque = isOpaque
    return UIGraphicsImageRenderer(size: canvas, format: format).image {
      _ in draw(in: CGRect(origin: .zero, size: canvas))
    }
  }
}

enum ImageResponse {
    case Success(image: UIImage)
    case Failure
}

class ImageProvider {
  static func getImageFromApi(imageURL: String, completion: ((ImageResponse) -> Void)?) {
        parseResponseAndGetImage(imageURL: imageURL, completion: completion)
    }
    
  static func parseResponseAndGetImage(imageURL: String, completion: ((ImageResponse) -> Void)?) {
        let url = URL(string: imageURL)!
        let urlRequest = URLRequest(url: url)
        let task = URLSession.shared.dataTask(with: urlRequest) { data, urlResponse, error in
            parseImageFromResponse(data: data, urlResponse: urlResponse, error: error, completion: completion)
        }
        task.resume()
        
    }
    
    static func parseImageFromResponse(data: Data?, urlResponse: URLResponse?, error: Error?, completion: ((ImageResponse) -> Void)?) {
        
        guard error == nil, let content = data else {
            print("error getting image data")
            let response = ImageResponse.Failure
            completion?(response)
            return
        }
        
        let image = UIImage(data: content)!
        let response = ImageResponse.Success(image: image.resized(toWidth: 800)!)
        completion?(response)
    }
}



struct Provider: IntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
      return SimpleEntry(date: Date(), configuration: ConfigurationIntent(), title: "EVENT NAME", timer: 0, image: UIImage(systemName: "multiply.circle.fill")!)
    }

    func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
      let entry = SimpleEntry(date: Date(), configuration: configuration, title: "EVENT NAME", timer: 0,  image: UIImage(systemName: "multiply.circle.fill")!)
        completion(entry)
    }

    func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        let userDefaults = UserDefaults.init(suiteName: "group.eventTimer")
        if userDefaults != nil {
          let entryDate = Date()
          if let savedData = userDefaults!.value(forKey: "eventWidget") as? String {
            let decoder = JSONDecoder()
            let data = savedData.data(using: .utf8)
            if let parsedData = try? decoder.decode(WidgetData.self, from: data!) {
              let nextRefresh = Calendar.current.date(byAdding: .minute, value: 5, to: entryDate)!
              ImageProvider.getImageFromApi(imageURL: parsedData.image) { imageResponse in
                var entries: [SimpleEntry] = []
                let entry: SimpleEntry
                
                switch imageResponse {
                case .Failure:
                  entry = SimpleEntry(date: nextRefresh, configuration: configuration, title: parsedData.title, timer: Double(parsedData.timer) ?? 0, image: UIImage(systemName: "multiply.circle.fill")!)
                  break
                case .Success(let image):
                  entry = SimpleEntry(date: nextRefresh, configuration: configuration, title: parsedData.title, timer: Double(parsedData.timer) ?? 0, image: image)
                }
                
                entries.append(entry)
                let timeline = Timeline(entries: entries, policy: .atEnd)
                completion(timeline)
              }
            } else {
              print("Could not parse data")
            }
          } else {
            let nextRefresh = Calendar.current.date(byAdding: .minute, value: 5, to: entryDate)!
            let entry = SimpleEntry(date: nextRefresh, configuration: configuration, title: "No event", timer: 0, image: UIImage(systemName: "multiply.circle.fill")!)
            let timeline = Timeline(entries: [entry], policy: .atEnd)
            completion(timeline)
          }
        }
//        var entries: [SimpleEntry] = []
//        let valuesData: ValuesData
//        let userDefaults = UserDefaults.init(suiteName: "group.widget")
//        let jsonText = userDefaults!.value(forKey: "eventWidget") as? String
//        let jsonData = Data(jsonText?.utf8 ?? "".utf8)
//        let valuesData = try! JSONDecoder().decode(ValuesData.self, from: jsonData)
      

        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
//        let currentDate = Date()
//        for hourOffset in 0 ..< 5 {
//            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
//            let entry = SimpleEntry(date: entryDate, configuration: configuration, data: valuesData)
//            entries.append(entry)
//        }
      
//      valuesData = ValuesData(title: "jksdncjds", image: UIImage(systemName: "multiply.circle.fill"))
//      let entry = SimpleEntry(date: Date(), configuration: configuration, data: )
//
//        entries.append(entry)
//        let timeline = Timeline(entries: entries, policy: .atEnd)
//        completion(timeline)
    }
}

struct WidgetData: Decodable {
  let title: String
  let image: String
  let timer: String
}
struct SimpleEntry: TimelineEntry {
    let date: Date
    let configuration: ConfigurationIntent
    let title: String
    let timer: Double
    let image: UIImage
}

struct EventTimerView : View {
  var entry: Provider.Entry
  
  var body: some View {
//    GeometryReader { geo in
//      HStack(alignment: .center) {
//        Text(entry.title)
//          .font(.callout)
//          .multilineTextAlignment(.center)
//          .padding(10)
//          .foregroundColor(.white)
//        Spacer()
//      }.background(
//        .regularMaterial,
//        in: RoundedRectangle(cornerRadius: 20, style: .continuous)
//      )
//      .cornerRadius(20)
//      .padding(5)
//    }
    VStack(alignment: .leading, spacing: 20) {
      Spacer()
      Text(entry.title)
        .bold()
        .font(.title)
        .multilineTextAlignment(.center)
        .foregroundColor(.white)
        .frame(maxWidth: .infinity, alignment: .center)
      Text(Date.now.addingTimeInterval(entry.timer), style: .relative)
        .bold()
        .font(.headline)
        .multilineTextAlignment(.center)
        .foregroundColor(.white)
        .frame(maxWidth: .infinity, alignment: .center)
      Spacer()
    }
    .padding()
    .frame(maxWidth: .infinity, maxHeight: .infinity)
  }
}

struct EventWidgetEntryView : View {
    var entry: Provider.Entry
  
    @Environment(\.widgetFamily) var family

    var body: some View {
      GeometryReader { geo in
          ZStack(alignment: .bottom) {
              Image(uiImage: entry.image)
                  .resizable()
                  .scaledToFill()
                  .frame(width: geo.size.width, height: geo.size.height)
                  .overlay(EventTimerView(entry: entry), alignment: .topLeading)
//              Text(entry.title).bold().font(.system(size: 16))
//              Text(Date.now.addingTimeInterval(1200), style: .relative).font(.system(size: 12)).multilineTextAlignment(.center)
          }
      }
    }
}

struct EventWidget: Widget {
    let kind: String = "EventWidget"

    var body: some WidgetConfiguration {
        IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider()) { entry in
            EventWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("My Widget")
        .description("This is an example widget.")
    }
}

struct EventWidget_Previews: PreviewProvider {
    static var previews: some View {
      EventWidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent(), title: "EVENT NAME", timer: 0, image: UIImage(systemName: "multiply.circle.fill")!))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
