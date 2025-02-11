export const config = {
  // Whether we're publishing next or latest tags
  tag: 'next',
  // Minimum node version
  node: 16,
  // Site to download from
  fileUri: 'https://raw.githubusercontent.com',
  // Repository to download from
  repo: process.env.FS_REPO || 'freesewing/freesewing',
  // Branch to download from
  branch: process.env.FS_BRANCH || 'alpha-release',
  i18n: [
    'account',
    'common',
    'patrons',
    'themes',
    'workbench',
    'errors',
    'i18n',
    'lab',
    'measurements',
    'optiongroups',
    'o_bella',
    'o_bent',
    'o_breanna',
    'o_brian',
    'o_titan',
    'parts',
    'plugin',
    'settings',
    'welcome',
  ],
  gitignore: `
# See https://help.github.com/ignore-files/ for more about ignoring files.

# dependencies
node_modules

# builds
dist
.next

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
`,
  fetch: {
    config: [
      {
        from: 'measurements.mjs',
        to: 'shared/config/measurements.mjs',
      },
    ],
    sites: [
      'shared/utils.mjs',
      'shared/designs/index.js',
      'shared/config/i18n.config.mjs',
      'shared/config/freesewing.mjs',
      'shared/config/next.mjs',
      'shared/config/tailwind-force.html',
      'shared/config/postcss.config.js',
      'shared/config/tailwind.config.js',
      'shared/hooks/useGist.js',
      'shared/hooks/useLocalStorage.js',
      'shared/hooks/useTheme.js',
      'shared/mdx/compiler.js',
      'shared/mdx/mdx-plugin-toc.mjs',
      'shared/mdx/loader.js',
      'shared/mdx/remark-intro-plugin.mjs',
      'shared/styles/code.css',
      'shared/styles/globals.css',
      'shared/styles/svg-freesewing-draft.css',
      'shared/strapi/loader.js',
      'shared/strapi/qa.mjs',
      'shared/themes/dark.js',
      'shared/themes/hax0r.js',
      'shared/themes/lgbtq.js',
      'shared/themes/light.js',
      'shared/themes/index.js',
      'shared/themes/runtime.js',
      'shared/prebuild/feed.mjs',
      'shared/prebuild/i18n-only.mjs',
      'shared/prebuild/i18n.mjs',
      'shared/prebuild/contributors.mjs',
      'shared/prebuild/index.mjs',
      'shared/prebuild/lab.mjs',
      'shared/prebuild/md-intro.mjs',
      'shared/prebuild/mdx.mjs',
      'shared/prebuild/navigation.mjs',
      'shared/prebuild/patrons.mjs',
      'shared/prebuild/strapi.mjs',
      'shared/prebuild/og/index.mjs',
      'shared/components/breadcrumbs.js',
      'shared/components/code.js',
      'shared/components/copy-to-clipboard.js',
      'shared/components/docs-link.js',
      'shared/components/json-highlight.js',
      'shared/components/lightbox.js',
      'shared/components/loader.js',
      'shared/components/locale-picker.js',
      'shared/components/modal.js',
      'shared/components/page-link.js',
      'shared/components/picker.js',
      'shared/components/popout.js',
      'shared/components/raw-span.js',
      'shared/components/ribbon.js',
      'shared/components/spinner.js',
      'shared/components/theme-picker.js',
      'shared/components/web-link.js',
      'shared/components/wordmark.js',
      'shared/components/worm.js',
      'shared/components/yaml.js',
      'shared/components/error/error-boundary.js',
      'shared/components/error/reset-buttons.js',
      'shared/components/error/view.js',
      'shared/components/logos/cc-by.js',
      'shared/components/logos/cc.js',
      'shared/components/logos/freesewing.js',
      'shared/components/logos/osi.js',
      'shared/components/mdx/example.js',
      'shared/components/mdx/examples.js',
      'shared/components/mdx/figure.js',
      'shared/components/mdx/highlight.js',
      'shared/components/mdx/http-method.js',
      'shared/components/mdx/index.js',
      'shared/components/mdx/prev-next.js',
      'shared/components/mdx/read-more.js',
      'shared/components/mdx/status-code.js',
      'shared/components/mdx/tabs.js',
      'shared/components/mdx/youtube.js',
      'shared/components/layouts/default.js',
      'shared/components/navigation/aside.js',
      'shared/components/navigation/primary.js',
      'shared/components/icons/box.js',
      'shared/components/icons/camera.js',
      'shared/components/icons/clear.js',
      'shared/components/icons/close.js',
      'shared/components/icons/cog.js',
      'shared/components/icons/community.js',
      'shared/components/icons/copy.js',
      'shared/components/icons/design.js',
      'shared/components/icons/discord.js',
      'shared/components/icons/docs.js',
      'shared/components/icons/down.js',
      'shared/components/icons/edit.js',
      'shared/components/icons/export.js',
      'shared/components/icons/facebook.js',
      'shared/components/icons/filter.js',
      'shared/components/icons/flip.js',
      'shared/components/icons/freesewing.js',
      'shared/components/icons/github.js',
      'shared/components/icons/guide.js',
      'shared/components/icons/google.js',
      'shared/components/icons/heart.js',
      'shared/components/icons/home.js',
      'shared/components/icons/help.js',
      'shared/components/icons/i18n.js',
      'shared/components/icons/instagram.js',
      'shared/components/icons/left.js',
      'shared/components/icons/menswear.js',
      'shared/components/icons/menu.js',
      'shared/components/icons/note.js',
      'shared/components/icons/options.js',
      'shared/components/icons/page-size.js',
      'shared/components/icons/page.js',
      'shared/components/icons/print.js',
      'shared/components/icons/reddit.js',
      'shared/components/icons/right.js',
      'shared/components/icons/rotate.js',
      'shared/components/icons/rss.js',
      'shared/components/icons/search.js',
      'shared/components/icons/settings.js',
      'shared/components/icons/sheet.js',
      'shared/components/icons/swipeleft.js',
      'shared/components/icons/swiperight.js',
      'shared/components/icons/theme.js',
      'shared/components/icons/tip.js',
      'shared/components/icons/tutorial.js',
      'shared/components/icons/twitter.js',
      'shared/components/icons/user.js',
      'shared/components/icons/versions.js',
      'shared/components/icons/womenswear.js',
      'shared/components/icons/xray.js',
      'shared/components/wrappers/img.js',
      'shared/components/wrappers/mdx.js',
      'shared/components/wrappers/page.js',
      'shared/components/wrappers/toc.js',
      'shared/components/wrappers/workbench.js',
      'shared/components/robot/index.js',
      'shared/components/robot/poses.js',
      'shared/components/workbench/default-settings.js',
      'shared/components/workbench/gist-as-json.js',
      'shared/components/workbench/logs.js',
      'shared/components/workbench/sample.js',
      'shared/components/workbench/preload.js',
      'shared/components/workbench/yaml.js',
      'shared/components/workbench/exporting/export-handler.js',
      'shared/components/workbench/exporting/export-worker.js',
      'shared/components/workbench/exporting/index.js',
      'shared/components/workbench/exporting/pdf-maker.js',
      'shared/components/workbench/inputs/design-option-count.js',
      'shared/components/workbench/inputs/design-option-list.js',
      'shared/components/workbench/inputs/design-option-pct-deg.js',
      'shared/components/workbench/inputs/measurement.js',
      'shared/components/workbench/measurements/index.js',
      'shared/components/workbench/measurements/non-human.js',
      'shared/components/workbench/layout/cut/index.js',
      'shared/components/workbench/layout/cut/settings.js',
      'shared/components/workbench/layout/print/index.js',
      'shared/components/workbench/layout/print/orientation-picker.js',
      'shared/components/workbench/layout/print/pagesize-picker.js',
      'shared/components/workbench/layout/print/plugin.js',
      'shared/components/workbench/layout/print/settings.js',
      'shared/components/workbench/layout/draft/index.js',
      'shared/components/workbench/layout/draft/stack.js',
      'shared/components/workbench/layout/draft/buttons.js',
      'shared/components/workbench/draft/error.js',
      'shared/components/workbench/draft/index.js',
      'shared/components/workbench/draft/stack.js',
      'shared/components/workbench/draft/svg-wrapper.js',
      'shared/components/workbench/draft/utils.js',
      'shared/components/workbench/draft/circle/index.js',
      'shared/components/workbench/draft/path/index.js',
      'shared/components/workbench/draft/defs/index.js',
      'shared/components/workbench/draft/part/index.js',
      'shared/components/workbench/draft/snippet/index.js',
      'shared/components/workbench/draft/point/index.js',
      'shared/components/workbench/draft/text/index.js',
      'shared/components/workbench/draft/svg/index.js',
      'shared/components/workbench/draft/text-on-path/index.js',
      'shared/components/workbench/layout/cut/index.js',
      'shared/components/workbench/layout/cut/settings.js',
      'shared/components/workbench/layout/draft/buttons.js',
      'shared/components/workbench/layout/draft/index.js',
      'shared/components/workbench/layout/draft/stack.js',
      'shared/components/workbench/layout/print/index.js',
      'shared/components/workbench/layout/print/orientation-picker.js',
      'shared/components/workbench/layout/print/pagesize-picker.js',
      'shared/components/workbench/layout/print/plugin.js',
      'shared/components/workbench/layout/print/settings.js',
      'shared/components/workbench/menu/index.js',
      'shared/components/workbench/menu/view.js',
      'shared/components/workbench/menu/core-settings/core-setting-bool.js',
      'shared/components/workbench/menu/core-settings/core-setting-list.js',
      'shared/components/workbench/menu/core-settings/core-setting-mm.js',
      'shared/components/workbench/menu/core-settings/core-setting-nr.js',
      'shared/components/workbench/menu/core-settings/core-setting-only.js',
      'shared/components/workbench/menu/core-settings/core-setting-sa-mm.js',
      'shared/components/workbench/menu/core-settings/index.js',
      'shared/components/workbench/menu/core-settings/setting.js',
      'shared/components/workbench/menu/core-settings/core-setting-sa-bool.js',
      'shared/components/workbench/menu/design-options/option-group.js',
      'shared/components/workbench/menu/design-options/index.js',
      'shared/components/workbench/menu/design-options/option-value.js',
      'shared/components/workbench/menu/design-options/option.js',
      'shared/components/workbench/menu/design-options/option-input.js',
      'shared/components/workbench/menu/xray/attributes.js',
      'shared/components/workbench/menu/xray/disable.js',
      'shared/components/workbench/menu/xray/index.js',
      'shared/components/workbench/menu/xray/list.js',
      'shared/components/workbench/menu/xray/log.js',
      'shared/components/workbench/menu/xray/point.js',
      'shared/components/workbench/menu/xray/reset.js',
      'shared/components/workbench/menu/xray/path-ops.js',
      'shared/components/workbench/menu/xray/path.js',
      'shared/components/workbench/menu/test-design-options/option.js',
      'shared/components/workbench/menu/test-design-options/index.js',
      'lab/components/about.js',
      'lab/components/design-picker.js',
      'lab/components/wrappers/layout.js',
      'lab/components/wrappers/page.js',
      'lab/components/layouts/bare.js',
      'lab/components/layouts/lab.js',
    ],
  },
}
