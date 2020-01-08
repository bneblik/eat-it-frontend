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

interface ChangeLangProps {
  history: History<LocationState>;
  match: any;
}
type ChangeLangState = {
  dialogOpened: boolean;
};

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
    const newPath =
      this.props.match.url === `/${prevLang}`
        ? prevPath.replace(`/${prevLang}/`, `/${lang}/`)
        : `/${lang}${prevPath}`;
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
            Change language
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
