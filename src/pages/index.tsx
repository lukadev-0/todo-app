import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />

        <div className="px-4 flex-1 flex items-center">
          <main className="mx-auto max-w-screen-xl w-full text-center lg:text-left">
            <div className="max-w-lg mx-auto lg:mx-0">
              <h1 className=" text-4xl lg:text-6xl font-black text-black dark:text-white mb-3">
                Really awesome todo app.
              </h1>

              <p className="text-xl text-gray-700 dark:text-gray-400">
                Create lists with stuff that has to be done, and easily share
                them with anyone.
              </p>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Home
