import React, { Component } from 'react';
import '../../styles/css/change-lang.styles.css';
import { i18n } from '../..';
import { History, LocationState } from 'history';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeEurope, faTimes } from '@fortawesome/free-solid-svg-icons';
import { defaultLang } from '../../utils/LanguageService';

interface ChangeLangProps {
  /**
   * contains address URL
   */
  history: History<LocationState>;
  /**
   * contains @param url with information about current language
   */
  match: any;
}
type ChangeLangState = {
  dialogOpened: boolean;
};

/**
 * This component is a form for changing language of the application
 * @author Beata Szczuka
 */
class ChangeLang extends Component<ChangeLangProps> {
  state: ChangeLangState = {
    dialogOpened: false
  };

  toggleDialog() {
    this.setState((prevState: ChangeLangState) => ({
      dialogOpened: !prevState.dialogOpened
    }));
  }
  setLanguage(lang: string) {
    const prevLang = i18n.language;
    i18n.activate(lang);
    const prevPath = this.props.history.location.pathname;
    let newPath;
    if (this.props.match.url === '' && lang !== defaultLang) {
      newPath = `/${lang}${prevPath}`;
    } else if (this.props.match.url === `/${prevLang}` && lang !== defaultLang) {
      newPath = prevPath.replace(`/${prevLang}/`, `/${lang}/`);
    } else newPath = prevPath.replace(`/${prevLang}/`, '/');
    this.props.history.push(newPath);
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setLanguage((event.target as HTMLInputElement).value);
  };

  render() {
    return (
      <>
        <IconButton onClick={this.toggleDialog.bind(this)}>
          <FontAwesomeIcon icon={faGlobeEurope} />
        </IconButton>
        <Dialog
          open={this.state.dialogOpened}
          onClose={() => this.setState({ dialogOpened: false })}
          className="changeLangComponent"
        >
          <IconButton className="close" onClick={() => this.setState({ dialogOpened: false })}>
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
          <DialogTitle className="title">
            <FontAwesomeIcon icon={faGlobeEurope} />
            {i18n._('Change language')}
          </DialogTitle>
          <DialogContent>
            <RadioGroup value={i18n.language} onChange={this.handleChange}>
              {i18n.availableLanguages.map((lang, key) => (
                <FormControlLabel
                  className="option"
                  key={key}
                  value={lang}
                  control={<Radio />}
                  label={lang}
                />
              ))}
            </RadioGroup>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default ChangeLang;
