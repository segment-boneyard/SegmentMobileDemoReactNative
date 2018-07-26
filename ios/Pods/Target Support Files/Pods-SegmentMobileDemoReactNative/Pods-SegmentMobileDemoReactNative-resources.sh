#!/bin/sh
set -e
set -u
set -o pipefail

if [ -z ${UNLOCALIZED_RESOURCES_FOLDER_PATH+x} ]; then
    # If UNLOCALIZED_RESOURCES_FOLDER_PATH is not set, then there's nowhere for us to copy
    # resources to, so exit 0 (signalling the script phase was successful).
    exit 0
fi

mkdir -p "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"

RESOURCES_TO_COPY=${PODS_ROOT}/resources-to-copy-${TARGETNAME}.txt
> "$RESOURCES_TO_COPY"

XCASSET_FILES=()

# This protects against multiple targets copying the same framework dependency at the same time. The solution
# was originally proposed here: https://lists.samba.org/archive/rsync/2008-February/020158.html
RSYNC_PROTECT_TMP_FILES=(--filter "P .*.??????")

case "${TARGETED_DEVICE_FAMILY:-}" in
  1,2)
    TARGET_DEVICE_ARGS="--target-device ipad --target-device iphone"
    ;;
  1)
    TARGET_DEVICE_ARGS="--target-device iphone"
    ;;
  2)
    TARGET_DEVICE_ARGS="--target-device ipad"
    ;;
  3)
    TARGET_DEVICE_ARGS="--target-device tv"
    ;;
  4)
    TARGET_DEVICE_ARGS="--target-device watch"
    ;;
  *)
    TARGET_DEVICE_ARGS="--target-device mac"
    ;;
esac

install_resource()
{
  if [[ "$1" = /* ]] ; then
    RESOURCE_PATH="$1"
  else
    RESOURCE_PATH="${PODS_ROOT}/$1"
  fi
  if [[ ! -e "$RESOURCE_PATH" ]] ; then
    cat << EOM
error: Resource "$RESOURCE_PATH" not found. Run 'pod install' to update the copy resources script.
EOM
    exit 1
  fi
  case $RESOURCE_PATH in
    *.storyboard)
      echo "ibtool --reference-external-strings-file --errors --warnings --notices --minimum-deployment-target ${!DEPLOYMENT_TARGET_SETTING_NAME} --output-format human-readable-text --compile ${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename \"$RESOURCE_PATH\" .storyboard`.storyboardc $RESOURCE_PATH --sdk ${SDKROOT} ${TARGET_DEVICE_ARGS}" || true
      ibtool --reference-external-strings-file --errors --warnings --notices --minimum-deployment-target ${!DEPLOYMENT_TARGET_SETTING_NAME} --output-format human-readable-text --compile "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename \"$RESOURCE_PATH\" .storyboard`.storyboardc" "$RESOURCE_PATH" --sdk "${SDKROOT}" ${TARGET_DEVICE_ARGS}
      ;;
    *.xib)
      echo "ibtool --reference-external-strings-file --errors --warnings --notices --minimum-deployment-target ${!DEPLOYMENT_TARGET_SETTING_NAME} --output-format human-readable-text --compile ${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename \"$RESOURCE_PATH\" .xib`.nib $RESOURCE_PATH --sdk ${SDKROOT} ${TARGET_DEVICE_ARGS}" || true
      ibtool --reference-external-strings-file --errors --warnings --notices --minimum-deployment-target ${!DEPLOYMENT_TARGET_SETTING_NAME} --output-format human-readable-text --compile "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename \"$RESOURCE_PATH\" .xib`.nib" "$RESOURCE_PATH" --sdk "${SDKROOT}" ${TARGET_DEVICE_ARGS}
      ;;
    *.framework)
      echo "mkdir -p ${TARGET_BUILD_DIR}/${FRAMEWORKS_FOLDER_PATH}" || true
      mkdir -p "${TARGET_BUILD_DIR}/${FRAMEWORKS_FOLDER_PATH}"
      echo "rsync --delete -av "${RSYNC_PROTECT_TMP_FILES[@]}" $RESOURCE_PATH ${TARGET_BUILD_DIR}/${FRAMEWORKS_FOLDER_PATH}" || true
      rsync --delete -av "${RSYNC_PROTECT_TMP_FILES[@]}" "$RESOURCE_PATH" "${TARGET_BUILD_DIR}/${FRAMEWORKS_FOLDER_PATH}"
      ;;
    *.xcdatamodel)
      echo "xcrun momc \"$RESOURCE_PATH\" \"${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename "$RESOURCE_PATH"`.mom\"" || true
      xcrun momc "$RESOURCE_PATH" "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename "$RESOURCE_PATH" .xcdatamodel`.mom"
      ;;
    *.xcdatamodeld)
      echo "xcrun momc \"$RESOURCE_PATH\" \"${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename "$RESOURCE_PATH" .xcdatamodeld`.momd\"" || true
      xcrun momc "$RESOURCE_PATH" "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename "$RESOURCE_PATH" .xcdatamodeld`.momd"
      ;;
    *.xcmappingmodel)
      echo "xcrun mapc \"$RESOURCE_PATH\" \"${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename "$RESOURCE_PATH" .xcmappingmodel`.cdm\"" || true
      xcrun mapc "$RESOURCE_PATH" "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename "$RESOURCE_PATH" .xcmappingmodel`.cdm"
      ;;
    *.xcassets)
      ABSOLUTE_XCASSET_FILE="$RESOURCE_PATH"
      XCASSET_FILES+=("$ABSOLUTE_XCASSET_FILE")
      ;;
    *)
      echo "$RESOURCE_PATH" || true
      echo "$RESOURCE_PATH" >> "$RESOURCES_TO_COPY"
      ;;
  esac
}
if [[ "$CONFIGURATION" == "Debug" ]]; then
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ABKModalFeedbackViewController.xib"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ABKNavigationFeedbackViewController.xib"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ar.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/Base.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/da.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/de.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/en.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/es-419.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/es-MX.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/es.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/et.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/fi.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/fil.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/fr.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/he.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/hi.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/id.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/images/checkmark-bg.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/images/checkmark-bg@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/images/checkmark.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/images/checkmark@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/it.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ja.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/km.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ko.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/lo.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ms.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/my.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/nb.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/nl.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/pl.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/pt-PT.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/pt.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ru.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/sv.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/th.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/vi.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/zh-Hans.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/zh-Hant.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/zh-HK.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/zh-TW.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/zh.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ar.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/Base.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/da.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/de.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/en.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/es-419.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/es-MX.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/es.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/et.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/fi.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/fil.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/fr.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/he.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/hi.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/id.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/it.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ja.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/km.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ko.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/lo.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ms.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/my.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/nb.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/nl.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/pl.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/pt-PT.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/pt.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ru.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/sv.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/th.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/vi.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/zh-Hans.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/zh-Hant.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/zh-HK.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/zh-TW.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/zh.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/ABKInAppMessageFullViewController.xib"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/ABKInAppMessageHTMLFullViewController.xib"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/ABKInAppMessageModalViewController.xib"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/ABKInAppMessageSlideupViewController.xib"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/arrow.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/arrow@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/com_appboy_inapp_close_icon.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/com_appboy_inapp_close_icon@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/com_appboy_inapp_close_icon@3x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/FontAwesome.otf"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/SlideupArrow.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyKit/Appboy.bundle"
fi
if [[ "$CONFIGURATION" == "Release" ]]; then
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ABKModalFeedbackViewController.xib"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ABKNavigationFeedbackViewController.xib"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ar.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/Base.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/da.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/de.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/en.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/es-419.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/es-MX.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/es.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/et.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/fi.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/fil.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/fr.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/he.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/hi.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/id.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/images/checkmark-bg.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/images/checkmark-bg@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/images/checkmark.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/images/checkmark@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/it.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ja.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/km.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ko.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/lo.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ms.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/my.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/nb.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/nl.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/pl.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/pt-PT.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/pt.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ru.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/sv.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/th.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/vi.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/zh-Hans.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/zh-Hant.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/zh-HK.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/zh-TW.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/zh.lproj/AppboyFeedbackLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ar.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/Base.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/da.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/de.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/en.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/es-419.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/es-MX.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/es.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/et.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/fi.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/fil.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/fr.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/he.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/hi.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/id.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/it.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ja.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/km.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ko.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/lo.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ms.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/my.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/nb.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/nl.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/pl.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/pt-PT.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/pt.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/ru.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/sv.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/th.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/vi.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/zh-Hans.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/zh-Hant.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/zh-HK.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/zh-TW.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKFeedbackViewController/Feedback_Resources/zh.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/ABKInAppMessageFullViewController.xib"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/ABKInAppMessageHTMLFullViewController.xib"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/ABKInAppMessageModalViewController.xib"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/ABKInAppMessageSlideupViewController.xib"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/arrow.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/arrow@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/com_appboy_inapp_close_icon.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/com_appboy_inapp_close_icon@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/com_appboy_inapp_close_icon@3x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/FontAwesome.otf"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/InAppMessage/Resources/SlideupArrow.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyKit/Appboy.bundle"
fi

mkdir -p "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"
rsync -avr --copy-links --no-relative --exclude '*/.svn/*' --files-from="$RESOURCES_TO_COPY" / "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"
if [[ "${ACTION}" == "install" ]] && [[ "${SKIP_INSTALL}" == "NO" ]]; then
  mkdir -p "${INSTALL_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"
  rsync -avr --copy-links --no-relative --exclude '*/.svn/*' --files-from="$RESOURCES_TO_COPY" / "${INSTALL_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"
fi
rm -f "$RESOURCES_TO_COPY"

if [[ -n "${WRAPPER_EXTENSION}" ]] && [ "`xcrun --find actool`" ] && [ -n "${XCASSET_FILES:-}" ]
then
  # Find all other xcassets (this unfortunately includes those of path pods and other targets).
  OTHER_XCASSETS=$(find "$PWD" -iname "*.xcassets" -type d)
  while read line; do
    if [[ $line != "${PODS_ROOT}*" ]]; then
      XCASSET_FILES+=("$line")
    fi
  done <<<"$OTHER_XCASSETS"

  if [ -z ${ASSETCATALOG_COMPILER_APPICON_NAME+x} ]; then
    printf "%s\0" "${XCASSET_FILES[@]}" | xargs -0 xcrun actool --output-format human-readable-text --notices --warnings --platform "${PLATFORM_NAME}" --minimum-deployment-target "${!DEPLOYMENT_TARGET_SETTING_NAME}" ${TARGET_DEVICE_ARGS} --compress-pngs --compile "${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"
  else
    printf "%s\0" "${XCASSET_FILES[@]}" | xargs -0 xcrun actool --output-format human-readable-text --notices --warnings --platform "${PLATFORM_NAME}" --minimum-deployment-target "${!DEPLOYMENT_TARGET_SETTING_NAME}" ${TARGET_DEVICE_ARGS} --compress-pngs --compile "${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}" --app-icon "${ASSETCATALOG_COMPILER_APPICON_NAME}" --output-partial-info-plist "${TARGET_TEMP_DIR}/assetcatalog_generated_info_cocoapods.plist"
  fi
fi
