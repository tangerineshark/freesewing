import Page from 'site/components/wrappers/page.js'
import useApp from 'site/hooks/useApp.js'
import Popout from 'shared/components/popout.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
//import { useTranslation } from 'next-i18next'
import Layout from 'site/components/layouts/bare'
import PageLink from 'shared/components/page-link'

const HomePage = () => {
  const app = useApp()
  // Not using translation for now
  //  const { t } = useTranslation(['homepage', 'ograph'])

  return (
    <Page app={app} title="Welcome to FreeSewing.org" layout={Layout}>
      <div>
        <div className="max-w-xl m-auto my-32 px-6">
          <Popout fixme>
            Create homepage. Meanwhile check <PageLink href="/docs" txt="docs" />
          </Popout>
        </div>
      </div>
    </Page>
  )
}

export default HomePage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
