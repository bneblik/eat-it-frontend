import React, { Component } from 'react';
import '../../styles/css/calendar.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@material-ui/core';
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

interface CalendarState {
  selectedDate: Date;
}

class Calendar extends Component {
  state: CalendarState = {
    selectedDate: new Date()
  };
  render() {
    return (
      <div className="calendarComponent">
        {this.topOfCalenar()}
        {this.headerDays()}
        {this.drawDays()}
      </div>
    );
  }

  renderDayCell = (day: Date, i: number) => {
    let styles = 'cell day center';
    if (isToday(day)) {
      styles += ' today';
    }
    if (isSameDay(day, this.state.selectedDate)) {
      styles += ' selected';
    } else if (!isSameMonth(day, this.state.selectedDate)) {
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
    const firstOfMonth: Date = startOfMonth(this.state.selectedDate);
    const lastOfMonth: Date = lastDayOfMonth(this.state.selectedDate);
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
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
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
          <h3>{format(this.state.selectedDate, 'MMMM yyyy')}</h3>
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
    this.setState({ selectedDate: newSelection });
  };
  goToNextMonth = () => {
    this.setState((prevState: CalendarState) => ({
      selectedDate: addMonths(prevState.selectedDate, 1)
    }));
  };
  goToPrevMonth = () => {
    this.setState((prevState: CalendarState) => ({
      selectedDate: subMonths(prevState.selectedDate, 1)
    }));
  };
  selectToday = () => {
    this.setState({ selectedDate: new Date() });
  };
}

export { Calendar };
