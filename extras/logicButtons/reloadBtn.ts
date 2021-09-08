import { IlogicBtn } from '../cyUtil';
import { setEventListeners } from '../../index';
import { addHistoryContent, IHistoryContent } from '../../index';

let reloadDisabled: boolean = false;

export const getReloadBtn = (loadGraph: Function = () => {}): IlogicBtn => {
  const reloadBtn: IlogicBtn = {
    text: 'Reload',
    onClick: cy => {
      if (reloadDisabled) {
        return;
      }
      document.getElementById('animControls').style.display = 'none';
      const cyAfterReload = loadGraph();
      setEventListeners(cyAfterReload);
      reloadDisabled = true;
      setTimeout(() => {
        reloadDisabled = false;
      }, 1000);

      addHistoryContent(
        'Reload',
        (document.getElementById('selGraph') as HTMLSelectElement).value,
        []
      );
    }
  };
  return reloadBtn;
};
