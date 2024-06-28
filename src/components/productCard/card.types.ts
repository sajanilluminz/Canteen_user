import {IRecentObj} from '~state/slices/commonTypes';

export interface Iprops {
  item: IRecentObj;
  loading: boolean;
  index: number;
  rotate?: any;
  interpolateRotating?: any;
}
