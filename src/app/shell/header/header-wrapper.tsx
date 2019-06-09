import * as React from 'react';
import { connect } from 'react-redux';

import HeaderView from './header-view';

import { toggleMusic, toggleSoundEffects } from '../../actions/settings';
import { areSoundEffectsEnabled, isMusicEnabled } from '../../reducers';

import { IRootState } from '../../../models';

interface IStateProps {
  AreSoundEffectsEnabled: boolean;
  IsMusicEnabled: boolean;
}

interface IDispatchProps {
  ToggleMusic: () => void;
  ToggleSoundEffects: () => void;
}

type Props = IStateProps & IDispatchProps;

const HeaderWrapper = ({ AreSoundEffectsEnabled, IsMusicEnabled, ToggleMusic, ToggleSoundEffects }: Props) => {
  const handleToggleMusic = () => {
    ToggleMusic();
  };

  const handleToggleSoundEffects = () => {
    ToggleSoundEffects();
  };

  const handleNavigation = () => {
    setIsOpen(false);
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <HeaderView
      areSoundEffectsEnabled={AreSoundEffectsEnabled}
      isMusicEnabled={IsMusicEnabled}
      handleNavigation={handleNavigation}
      handleToggleMenu={handleToggleMenu}
      handleToggleMusic={handleToggleMusic}
      handleToggleSoundEffects={handleToggleSoundEffects}
      isOpen={isOpen}
    />
  );
};

const mapStateToProps = (state: IRootState) => {
  const AreSoundEffectsEnabled = areSoundEffectsEnabled(state);
  const IsMusicEnabled = isMusicEnabled(state);

  return {
    AreSoundEffectsEnabled,
    IsMusicEnabled,
  };
};

const mapDispatchToProps = {
  ToggleMusic: toggleMusic,
  ToggleSoundEffects: toggleSoundEffects,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderWrapper);
