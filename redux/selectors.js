//get state out of the reducer
export const getUserSelector = (state) => state.userSlice.userInfo;
export const getEventSelector = (state) => state.eventSlice.event;
export const getEventListSelector = (state) => state.eventSlice.eventList;
export const getEventLoadingtSelector = (state) => state.eventSlice.loading;
