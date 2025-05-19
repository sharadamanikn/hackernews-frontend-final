
import NavigationBar from "./components/navigation-bar/NavigationBar";
import "./globals.css";

import React, { PropsWithChildren } from 'react'

const RootLayout = (props:PropsWithChildren) => {
  return (
    <html lang="en">
      <body className="bg-gray-900">
         <NavigationBar />
        {props.children}
      </body>
    </html>
  )
}

export default RootLayout