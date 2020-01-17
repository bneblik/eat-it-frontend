import React, { Component } from 'react';
import '../../styles/css/calendar.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { Button, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import {
  isSameMonth,
  addDays,
  lastDayOfMonth,
  isBefore,
  startOfMonth,
  getDate,
  isSameDay,
  addMonths,
  startOfWeek,
  subMonths,
  format,
  isToday
} from 'date-fns';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { i18n } from '../..';

type CalendarProps = {
  selectedDate: Date;
  changeSelectedDate: (date: Date) => void;
  dateLocale: Locale;
};

interface CalendarState {
  open: boolean;
}

class Calendar extends Component<CalendarProps, CalendarState> {
  constructor(props: CalendarProps) {
    super(props);
    this.state = {
      open: false
    };
  }
  toggleCalendar = () => {
    this.setState((prevState: CalendarState) => ({
      open: !prevState.open
    }));
  };
  render() {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={this.toggleCalendar}
          endIcon={<FontAwesomeIcon icon={faCalendarAlt} />}
        >
          {i18n._('Select day')}
        </Button>
        <Dialog onClose={this.toggleCalendar} open={this.state.open}>
          <DialogContent>
            <div className="calendarComponent">
              {this.topOfCalenar()}
              {this.headerDays()}
              {this.drawDays()}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleCalendar} color="primary">
              {i18n._('Close')}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  renderDayCell = (day: Date, i: number) => {
    let styles = 'cell day center';
    if (isToday(day)) {
      styles += ' today';
    }
    if (isSameDay(day, this.props.selectedDate)) {
      styles += ' selected';
    } else if (!isSameMonth(day, this.props.selectedDate)) {
      styles += ' disabled';
    }
    const newSelection = day;
    return (
      <div className={styles} key={i} onClick={() => this.selectDate(newSelection)}>
        {getDate(day)}
      </div>
    );
  };
  drawDays = () => {
    const weeks = [];
    const firstOfMonth: Date = startOfMonth(this.props.selectedDate);
    const lastOfMonth: Date = lastDayOfMonth(this.props.selectedDate);
    let currentDay: Date = startOfWeek(firstOfMonth, { weekStartsOn: 1 });
    let key = 0;
    while (isBefore(currentDay, lastOfMonth)) {
      const days: any[] = [];
      for (let i = 1; i <= 7; i++) {
        days.push(this.renderDayCell(currentDay, i));
        currentDay = addDays(currentDay, 1);
      }
      weeks.push(
        <div key={key++} className="row">
          {days}
        </div>
      );
    }
    return <div>{weeks}</div>;
  };

  headerDays = () => {
    const days = [
      i18n._('mon'),
      i18n._('tue'),
      i18n._('wed'),
      i18n._('thu'),
      i18n._('fri'),
      i18n._('sat'),
      i18n._('sun')
    ];
    const header: any[] = [];
    days.forEach((day, i) =>
      header.push(
        <div className="cell" key={i}>
          {day.toUpperCase()}
        </div>
      )
    );
    return <div className="row daysHeader">{header}</div>;
  };
  topOfCalenar = () => {
    return (
      <div className="calendarHeader">
        <div className="col col-start center">
          <Button onClick={this.goToPrevMonth}>
            <FontAwesomeIcon icon={faChevronLeft} color="rgb(50, 160, 50)" />
          </Button>
        </div>
        <div className="col col-center">
          <h3>{format(this.props.selectedDate, 'LLLL yyyy', { locale: this.props.dateLocale })}</h3>
          <span>
            <span>
              <Button title="Today" onClick={this.selectToday}>
                <FontAwesomeIcon className="padding" icon={faCalendarDay} />
                {format(new Date(), 'do MMM')}
              </Button>
            </span>
          </span>
        </div>
        <div className="col col-end center">
          <Button onClick={this.goToNextMonth}>
            <FontAwesomeIcon icon={faChevronRight} color="rgb(50, 160, 50)" />
          </Button>
        </div>
      </div>
    );
  };

  selectDate = (newSelection: Date) => {
    this.props.changeSelectedDate(newSelection);
  };
  goToNextMonth = () => {
    this.props.changeSelectedDate(addMonths(this.props.selectedDate, 1));
  };
  goToPrevMonth = () => {
    this.props.changeSelectedDate(subMonths(this.props.selectedDate, 1));
  };
  selectToday = () => {
    this.props.changeSelectedDate(new Date());
  };
}

export { Calendar };
