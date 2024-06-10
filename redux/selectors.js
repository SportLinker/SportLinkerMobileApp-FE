//get state out of the reducer
export const getUserSelector = (state) => state.userSlice.userInfo;

// EVENT
export const getEventSelector = (state) => state.eventSlice.event;
export const getEventListSelector = (state) => state.eventSlice.eventList;
export const getEventLoadingtSelector = (state) => state.eventSlice.loading;

// MESSAGE / CHAT
export const getListMessageSelector = (state) => state.messageSlice;
