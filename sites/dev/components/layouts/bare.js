import { useRouter } from 'next/router'
import Aside from 'shared/components/navigation/aside'

const DefaultLayout = ({ app, children = [] }) => {
  const router = useRouter()
  const slug = router.asPath.slice(1)

  return (
    <>
      <Aside app={app} slug={slug} mobileOnly />
      {children}
    </>
  )
}

export default DefaultLayout
