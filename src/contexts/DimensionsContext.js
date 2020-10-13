import React, { createContext, useState, useEffect, useContext } from "react";
import { Dimensions } from "react-native";
import { RoomContext } from "./RoomContext";

/**
 * DimensionsContext
 * Manages all the dimensions of components across the entire app in order
 * to use gestures for dragging and dropping cards into specific areas of the view.
 */
export const DimensionsContext = createContext();

const DimensionsProvider = props => {
  const { round } = useContext(RoomContext);
  // location of each active meld group
  const [meldsSwapArea, setMeldsSwapArea] = useState({});
  // dimensions of each active meld group
  const [meldDimensions, setMeldDimensions] = useState({});
  // vertical offset from top of screen to the beginning of the meld area
  const [meldAreaHeightOffset, setMeldAreaHeightOffset] = useState(0);
  // entire meld area size
  const [meldAreaSize, setMeldAreaSize] = useState({ width: 0, height: 0 });
  // height of the meld area container (includes new meld area)
  const [meldContainerHeight, setMeldContainerHeight] = useState(0);
  // new meld area height
  const [meldButtonAreaHeight, setMeldButtonAreaHeight] = useState(0);
  // entire screen width
  const [screenWidth, setScreenWidth] = useState(0);
  // location of discard pile
  const [discardCardArea, setDiscardCardArea] = useState({
    x: [0, 0],
    y: [0, 0]
  });
  // location of new meld area
  const [newMeldDropArea, setNewMeldDropArea] = useState({
    x: [0, 0],
    y: [0, 0]
  });
  // discard card area size
  const [discardAreaSize, setDiscardAreaSize] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0
  });
  // entire deck area size
  const [deckAreaSize, setDeckAreaSize] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0
  });
  // Sets to true when scroll occured in active meld area
  const [scrolledInSwapArea, setScrolledInSwapArea] = useState(false);

  /** Reset all meld dimensions every round */
  useEffect(() => {
    setMeldDimensions({});
  }, [round]);

  /** Set screen width */
  useEffect(() => {
    setScreenWidth(Dimensions.get("screen").width);
  }, []);

  /** Calculates drop area for cards to create a new meld */
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

  /** Calculates drop area for discard pile */
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

  /** Calculates drop area for each active meld */
  useEffect(() => {
    setScrolledInSwapArea(false);
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
  }, [
    meldDimensions,
    newMeldDropArea,
    meldAreaHeightOffset,
    scrolledInSwapArea
  ]);

  /**
   * meldDimensionHelper
   * Adds a new meld dimension
   * @param {Number} id
   * @param {Object} dimensions
   */
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
        meldAreaSize,
        meldContainerHeight,
        meldButtonAreaHeight,
        screenWidth,
        newMeldDropArea,
        discardAreaSize,
        meldDimensions,
        setMeldAreaHeightOffset: offset => setMeldAreaHeightOffset(offset),
        setMeldContainerHeight: height => setMeldContainerHeight(height),
        setMeldButtonAreaHeight: height => setMeldButtonAreaHeight(height),
        setMeldAreaSize: size => setMeldAreaSize(size),
        setDiscardCardArea: area => setDiscardCardArea(area),
        setDiscardAreaSize: size => setDiscardAreaSize(size),
        setMeldsSwapArea: area => setMeldsSwapArea(area),
        setMeldDimensions: (id, dimensions) =>
          meldDimensionsHelper(id, dimensions),
        setDeckAreaSize: size => setDeckAreaSize(size),
        setScrolledInSwapArea: val => setScrolledInSwapArea(val)
      }}
    >
      {props.children}
    </DimensionsContext.Provider>
  );
};

export default DimensionsProvider;
