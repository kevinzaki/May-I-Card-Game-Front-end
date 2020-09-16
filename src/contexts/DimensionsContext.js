import React, { createContext, useState, useEffect, useContext } from "react";
import { Dimensions } from "react-native";
import { RoomContext } from "./RoomContext";

export const DimensionsContext = createContext();

const DimensionsProvider = props => {
  const { round } = useContext(RoomContext);

  const [meldsSwapArea, setMeldsSwapArea] = useState({});
  const [meldDimensions, setMeldDimensions] = useState({});
  const [meldAreaHeightOffset, setMeldAreaHeightOffset] = useState(0);
  const [meldAreaSize, setMeldAreaSize] = useState({ width: 0, height: 0 });
  const [meldContainerHeight, setMeldContainerHeight] = useState(0);
  const [meldButtonAreaHeight, setMeldButtonAreaHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [discardCardArea, setDiscardCardArea] = useState({
    x: [0, 0],
    y: [0, 0]
  });
  const [newMeldDropArea, setNewMeldDropArea] = useState({
    x: [0, 0],
    y: [0, 0]
  });
  const [discardAreaSize, setDiscardAreaSize] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0
  });
  const [deckAreaSize, setDeckAreaSize] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0
  });

  useEffect(() => {
    setMeldDimensions({});
  }, [round]);

  useEffect(() => {
    setScreenWidth(Dimensions.get("screen").width);
  }, []);

  useEffect(() => {
    setNewMeldDropArea({
      x: [
        (screenWidth - meldAreaSize.width) / 2,
        meldAreaSize.width + (screenWidth - meldAreaSize.width) / 2
      ],
      y: [
        meldAreaHeightOffset +
          meldContainerHeight -
          meldAreaSize.height -
          meldButtonAreaHeight,
        meldAreaHeightOffset + meldContainerHeight - meldButtonAreaHeight
      ]
    });
  }, [
    meldAreaSize,
    meldAreaHeightOffset,
    meldContainerHeight,
    meldButtonAreaHeight
  ]);

  useEffect(() => {
    setDiscardCardArea({
      x: [
        newMeldDropArea.x[0] + deckAreaSize.width / 2 + discardAreaSize.x,
        newMeldDropArea.x[0] +
          deckAreaSize.width / 2 +
          discardAreaSize.x +
          discardAreaSize.width
      ],
      y: [
        newMeldDropArea.y[1] +
          (deckAreaSize.height - discardAreaSize.height) / 2 +
          meldButtonAreaHeight,
        newMeldDropArea.y[1] +
          (deckAreaSize.height - discardAreaSize.height) / 2 +
          discardAreaSize.height +
          meldButtonAreaHeight
      ]
    });
  }, [newMeldDropArea, discardAreaSize, deckAreaSize]);

  useEffect(() => {
    const swapArea = {};
    for (let id in meldDimensions) {
      let xOffset = newMeldDropArea.x[0];
      let yOffset = meldAreaHeightOffset;
      let { x, y, width, height } = meldDimensions[id];

      swapArea[id] = {
        x: [xOffset + x - 15, xOffset + x + width - 15],
        y: [yOffset + y, yOffset + y + height]
      };
    }
    setMeldsSwapArea(swapArea);
  }, [meldDimensions, newMeldDropArea, meldAreaHeightOffset]);

  function meldDimensionsHelper(id, dimensions) {
    setMeldDimensions(prevState => {
      let updatedState = {};
      updatedState[id] = dimensions;
      return { ...prevState, ...updatedState };
    });
  }

  return (
    <DimensionsContext.Provider
      value={{
        discardCardArea,
        meldsSwapArea,
        meldAreaHeightOffset,
        setMeldAreaHeightOffset: offset => setMeldAreaHeightOffset(offset),
        meldAreaSize,
        meldContainerHeight,
        meldButtonAreaHeight,
        setMeldContainerHeight: height => setMeldContainerHeight(height),
        setMeldButtonAreaHeight: height => setMeldButtonAreaHeight(height),
        setMeldAreaSize: size => setMeldAreaSize(size),
        setDiscardCardArea: area => setDiscardCardArea(area),
        screenWidth,
        newMeldDropArea,
        discardAreaSize,
        setDiscardAreaSize: size => setDiscardAreaSize(size),
        setMeldsSwapArea: area => setMeldsSwapArea(area),
        setMeldDimensions: (id, dimensions) =>
          meldDimensionsHelper(id, dimensions),
        meldDimensions,
        setDeckAreaSize: size => setDeckAreaSize(size)
      }}
    >
      {props.children}
    </DimensionsContext.Provider>
  );
};

export default DimensionsProvider;
