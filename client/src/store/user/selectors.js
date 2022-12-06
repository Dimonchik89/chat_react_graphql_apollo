import { createSelector } from "@reduxjs/toolkit";

const baseState = state => state.user;

export const user = createSelector(baseState, state => state.user);
export const email = createSelector(baseState, state => state.email);
export const userId = createSelector(baseState, state => state.userId);