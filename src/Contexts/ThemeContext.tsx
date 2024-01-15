"use client";
import React, { createContext, useContext, useState } from "react";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWX5edHRQRmJZU0JyW0Y="
);

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

const initialContextState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
  currentColor: "#396EA5",
  currentMode: "Light",
  activeMenu: true,
  screenSize: 0,
  handleClick: (clicked: any) => {},
  setScreenSize: (clicked: any) => {},
  isClicked: initialState,
  initialState,
  setIsClicked: (clicked: any) => {},
  setActiveMenu: (clicked: any) => {},
  setCurrentColor: (clicked: any) => {},
  setCurrentMode: (clicked: any) => {},
  setMode: (clicked: any) => {},
  setColor: (clicked: any) => {},
  themeSettings: false,
  setThemeSettings: (clicked: any) => {},
};
const StateContext = createContext(initialContextState);

export const ThemeProvider = ({ children }: any) => {
  const [screenSize, setScreenSize] = useState(0);
  const [currentColor, setCurrentColor] = useState(
    initialContextState.currentColor
  );
  const [currentMode, setCurrentMode] = useState(
    initialContextState.currentMode
  );
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const setMode = (e: any) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color: any) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked: any) =>
    setIsClicked({ ...initialState, [clicked]: true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      /* @ts-ignore */
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
