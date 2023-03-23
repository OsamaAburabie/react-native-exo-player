import ExpoModulesCore

public class ReactNativeExoPlayerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ReactNativeExoPlayer")

    Function("getTheme") { () -> String in
      "system"
    }
  }
}
