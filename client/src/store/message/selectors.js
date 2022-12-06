import { createSelector } from "@reduxjs/toolkit";

const baseState = state => state.messages;

export const messages = createSelector(baseState, state => state.messages)