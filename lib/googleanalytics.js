// google analytics
// yarn add react-ga
//https://www.youtube.com/watch?v=2woWjkED-vg&ab_channel=ChrisCooper 
//https://analytics.google.com/analytics/web/?authuser=1#/a315636407p443192361/admin/streams/table/8198957350 
import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('G-3KDRHQWHTV'); // Replace with your Tracking ID
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};