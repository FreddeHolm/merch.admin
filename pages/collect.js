//TODO
                    //kontaktformulär
                    //Fixa alla texter
                  //Sätt på cart länken
                    //mail med vilka produkter som köpts
                    //kalender för att välja datum/tid
                    //smått style (typ summa)
                    //min summa 100kr
//Frakt funkar inte riktigt 100% i stripe (medpacks/varianter)
                    //dubelkolla att välj datum funkar

//rabattkoder
//ladda up/visa  videos som produktbilder
//Fixa preset faktura på offertapp
            //Beställning godkändes
//


import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useStateContext } from '../context/StateContext';
import { useTranslation } from 'react-i18next';
import { client } from '../lib/client';
import Navbar from '../components/Navbar';
import { BsTrash3 } from 'react-icons/bs';
import { MailcontactCreate } from '../components';

import {
  addDays,
  isAfter,
  isBefore,
  isEqual,
  isWeekend,
  startOfDay,
  addWeeks,
  setHours,
  addHours,
  addMinutes,
  format,
  isSameDay,
  isToday,
  getISOWeek,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from 'date-fns';
import { sv, enUS } from 'date-fns/locale';

const Collect = ({ announcements, release, products, ratingsData }) => {
  const {
    totalPrice,
    noDiscountTotalPrice,
    cartItems,
    toggleCartItemQuanitity,
    onRemove,
    setCartItems,
    setTotalQuantities,
    setTotalPrice,
    setNoDiscountTotalPrice,
    totalQuantities,
  } = useStateContext();
  const [t, i18n] = useTranslation('global');

  const weekdays =
    i18n.language === 'sv'
      ? ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön']
      : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const generateCalendar = () => {
    const now = new Date();
    const minDate = startOfWeek(startOfDay(now), { weekStartsOn: 1 });
    const maxDate = endOfWeek(addWeeks(minDate, 3), { weekStartsOn: 1 });

    const calendar = [];
    let currentWeekStart = minDate;

    while (
      isBefore(currentWeekStart, maxDate) ||
      isEqual(currentWeekStart, maxDate)
    ) {
      const weekStart = currentWeekStart;
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
      const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

      // Get months present in the week
      const monthsInWeek = [
        ...new Set(
          days.map((d) =>
            format(d, 'MMMM', {
              locale: i18n.language === 'sv' ? sv : enUS,
            })
          )
        ),
      ];

      // Determine the month to display
      let monthToDisplay;
      if (monthsInWeek.length === 1) {
        monthToDisplay = monthsInWeek[0];
      } else {
        // Choose the month with the most days in the week
        const monthCounts = {};
        days.forEach((d) => {
          const month = format(d, 'MMMM', {
            locale: i18n.language === 'sv' ? sv : enUS,
          });
          monthCounts[month] = (monthCounts[month] || 0) + 1;
        });
        monthToDisplay = Object.keys(monthCounts).reduce((a, b) =>
          monthCounts[a] > monthCounts[b] ? a : b
        );
      }

      calendar.push({
        weekNumber: getISOWeek(weekStart),
        days,
        month: monthToDisplay,
      });
      currentWeekStart = addDays(weekStart, 7);
    }

    return calendar;
  };

  const calendar = generateCalendar();

  // Calculate patchDiscount and related variables
  let totalItemsWithPatches = 0;
  let numberOfDiscounts = 0;
  let patchDiscount = 0;

  cartItems.forEach((item) => {
    if (item.hasPatchesTag) {
      totalItemsWithPatches += item.quantity;
      numberOfDiscounts = Math.floor(totalItemsWithPatches / 10);
      patchDiscount = numberOfDiscounts * 50;
    }
  });

  // State variables for date and time selection
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [dateTimeError, setDateTimeError] = useState('');

  // Function to get the minimum selectable date and time
  const getMinSelectableDateTime = () => {
    const now = new Date();
    // Set minSelectableDateTime to two days from now
    let minSelectableDateTime = addDays(startOfDay(now), 2);

    // If minSelectableDateTime falls on a weekend, advance to next weekday
    while (isWeekend(minSelectableDateTime)) {
      minSelectableDateTime = addDays(minSelectableDateTime, 1);
    }

    return minSelectableDateTime;
  };

  // Function to check if a date is selectable
  const isDateSelectable = (date) => {
    const minSelectableDateTime = getMinSelectableDateTime();
    const minSelectableDate = startOfDay(minSelectableDateTime);
    const maxSelectableDate = addWeeks(startOfDay(new Date()), 3);

    return (
      !isWeekend(date) &&
      (isSameDay(date, minSelectableDate) ||
        isAfter(date, minSelectableDate)) &&
      isBefore(date, maxSelectableDate)
    );
  };

  // Function to generate available times for a selected date
  const generateAvailableTimes = (date) => {
    const times = [];
    const startHour = 8;
    const endHour = 16;
    const interval = 30; // Minutes

    const dateStart = startOfDay(date);
    const endTime = setHours(dateStart, endHour);
    let currentTime = setHours(dateStart, startHour);

    while (currentTime <= endTime) {
      times.push(new Date(currentTime));
      currentTime = addMinutes(currentTime, interval);
    }

    return times;
  };

  // Handle time selection
  const handleTimeSelection = (dateTime) => {
    if (selectedDates.length >= 4) {
      setDateTimeError(t('collect.You can select a maximum of 4 times.'));
      return;
    }
    setSelectedDates((prevDates) => [
      ...prevDates,
      { date: selectedDate, time: dateTime },
    ]);
    setDateTimeError('');
    setSelectedDate(null);
  };

  // Handle deleting a selected date/time
  const handleDeleteDate = (index) => {
    setSelectedDates((prevDates) => prevDates.filter((_, i) => i !== index));
  };

  // Get all months in the calendar
  const monthsInCalendar = [
    ...new Set(
      calendar.flatMap((week) =>
        week.days.map((date) =>
          format(date, 'MMM', { locale: i18n.language === 'sv' ? sv : enUS })
        )
      )
    ),
  ];

  return (
    <div>
      <Navbar
        announcements={announcements}
        release={release}
        productsss={products}
      />

      <div className="parent-container">
        <div className="privacy-policy-container">
          <div>
            <h1
              style={{
                textAlign: 'center',
                marginTop: '20px',
                color: 'var(--secondarycolor)',
              }}
            >
              {t('collect.Pick up in Linköping')}
            </h1>
          </div>

          {cartItems.length >= 1 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '10px',
                marginBottom: '-6px',
                paddingLeft: '20px',
                paddingRight: '20px',
                position: 'relative',
              }}
            ></div>
          )}

          {/* Heading and Trashcan Icon */}
          {cartItems.length >= 1 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                marginTop: '50px',
                marginBottom: '-10px',
                paddingLeft: '20px',
                paddingRight: '20px',
              }}
            >
              <div
                style={{ display: 'flex', alignItems: 'center', flex: 1 }}
              >
                <span
                  className="heading"
                  style={{
                    color: 'var(--secondarycolor)',
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }}
                >
                  {t('collect.Your basket')}
                </span>
                <span className="cart-num-items" style={{ marginLeft: '5px' }}>
                  ({totalQuantities} {t('collect.items')})
                </span>
              </div>

              <div
                onClick={() => {
                  setCartItems([]);
                  setTotalQuantities(0);
                  setTotalPrice(0);
                  setNoDiscountTotalPrice(0);
                }}
                className="trashcanicon2"
                style={{
                  cursor: 'pointer',
                }}
              >
                <BsTrash3
                  style={{
                    marginBottom: '-5px',
                    color: 'var(--primarycolor)',
                    fontSize: '24px',
                  }}
                />
              </div>
            </div>
          )}

          {cartItems.length < 1 ? (
            <div
              className="empty-cart"
              style={{ textAlign: 'center', marginTop: '50px' }}
            >
              <AiOutlineShopping
                size={150}
                color={'var(--secondarycolor)'}
              />
              <h3>{t('collect.Your basket is empty')}</h3>
              <Link href="/">
                <button type="button" className="btn">
                  {t('collect.Continue shopping')}
                </button>
              </Link>
            </div>
          ) : (
            <div>
              {/* Cart Items */}
              <div
                className="product-container"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  border: '1px solid var(--secondarycolor)',
                  borderRadius: '20px',
                  marginRight: '10px',
                  marginLeft: '10px',
                }}
              >
                {cartItems.map((item, index) => (
                  <div key={item.id} style={{ margin: '0 auto' }}>
                    <div
                      className="product2"
                      style={{
                        width: '100%',
                        borderBottom:
                          index !== cartItems.length - 1
                            ? '1px #ccc solid'
                            : 'none',
                        alignItems: 'center',
                      }}
                    >
                      <Link href={`/product/${item.slug.current}`}>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="cart-product-image2 image-hover-effect"
                        />
                      </Link>
                      <div className="item-desc2">
                        <div
                          className="flex2 top"
                          style={{ display: 'inline-block' }}
                        >
                          <Link href={`/product/${item.slug.current}`}>
                            <div className="image-hover-effect-text">
                              <h5
                                className="h5collect"
                                style={{ color: 'var(--secondarycolor)' }}
                              >
                                {i18n.language === 'sv'
                                  ? item.name
                                  : item.nameeng || item.name}{' '}
                                {item.hasPatchesTag && t('universal.imärke')}
                              </h5>
                            </div>
                          </Link>
                          {item.selectedVariation && (
                            <h4>
                              {i18n.language === 'sv' ||
                              !item.selectedVariation.nameeng
                                ? `(${item.selectedVariation.name})`
                                : `(${item.selectedVariation.nameeng})`}
                            </h4>
                          )}
                          <h4
                            className="price"
                            style={{
                              color: item.previousprice
                                ? 'var(--oldprimary)'
                                : 'var(--textetc)',
                            }}
                          >
                            {item.price} kr{' '}
                            {item.previousprice && (
                              <span
                                className="previous-price previous-price-style-small"
                                style={{ color: 'var(--secondarycolor)' }}
                              >
                                {item.previousprice} kr
                              </span>
                            )}
                          </h4>
                        </div>
                        <div
                          className={
                            item.selectedVariation
                              ? 'flex bottomvariation'
                              : 'flex bottom'
                          }
                        >
                          <div>
                            <p
                              className="quantity-desc"
                              style={{ marginTop: '-20px' }}
                            >
                              <span
                                className="minus"
                                onClick={() =>
                                  toggleCartItemQuanitity(item.id, 'dec')
                                }
                              >
                                <AiOutlineMinus />
                              </span>
                              <span className="num">{item.quantity}</span>
                              <span
                                className="plus"
                                onClick={() =>
                                  toggleCartItemQuanitity(item.id, 'inc')
                                }
                              >
                                <AiOutlinePlus />
                              </span>
                            </p>
                          </div>
                          <button
                            type="button"
                            className="remove-item"
                            onClick={() => onRemove(item)}
                          >
                            <TiDeleteOutline />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div
                  style={{
                    borderTop: '1px solid var(--secondarycolor)',
                    width: '100%',
                    marginBottom: '10px',
                  }}
                ></div>
                <div className="total">
                  <h3 style={{ color: 'var(--secondarycolor)' }}>
                    {t('collect.Total')}:&nbsp;
                  </h3>
                  <h3
                    style={{
                      color:
                        totalPrice - patchDiscount < noDiscountTotalPrice
                          ? 'var(--oldprimary)'
                          : 'var(--secondarycolor)',
                    }}
                  >
                    {totalPrice - patchDiscount} kr&nbsp;
                    {totalPrice - patchDiscount < noDiscountTotalPrice && (
                      <span
                        className="previous-price previous-price-style-small"
                        style={{ color: 'var(--secondarycolor)' }}
                      >
                        {noDiscountTotalPrice} kr
                      </span>
                    )}
                  </h3>
                </div>
              </div>

              {/* Conditional Rendering Based on Total Sum */}
              {totalPrice - patchDiscount >= 100 ? (
                <>







{/* Conditional Rendering Based on Total Sum */}

<h3  style={{
                            color: 'var(--secondarycolor)',
                            textAlign: 'center',
                            marginTop: "35px",
                            marginBottom: "-30px",

                          }}
                          >{t('collect.termsheader')}</h3>
                  <div
                    className="terms"
                    style={{
                      marginTop: '40px',
                      padding: '0 20px',
                      lineHeight: '1.6',
                    }}
                  >
                    <p>{t('collect.TermsText')}</p>
                  </div>

                  {/* Google Map */}

                  <h3
                          style={{
                            color: 'var(--secondarycolor)',
                            textAlign: 'center',
                            marginTop: "30px",
                            marginBottom: "-30px",

                          }}
                        >
                          {t('collect.collectlocation')}
                        </h3>
                  <div
                    className="map"
                    style={{
                      marginTop: '40px',
                      textAlign: 'center',
                      border: '1px solid var(--secondarycolor)',
                    }}
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1243.0344568263922!2d15.57484776780202!3d58.40138473291586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46596f6f429bba4f%3A0xcb438fc8a66c2033!2sHusEtt%2C%20583%2030%20Link%C3%B6ping!5e0!3m2!1ssv!2sse!4v1727199964917!5m2!1ssv!2sse"
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>



                
                  {/* Show the rest of the content */}
                  {/* Custom Calendar Date Selection */}
                  {selectedDates.length < 4 && (
                    <div
                      style={{
                        marginTop: '40px',
                        display: 'flex',
                        marginLeft: '-20px',
                        justifyContent: 'center',
                      }}
                    >
                      {/* Calendar Code */}
                      <div style={{ textAlign: 'left' }}>
                        <h2
                          style={{
                            color: 'var(--secondarycolor)',
                            textAlign: 'center',
                            marginBottom: "10px"
                          }}
                        >
                          {t('collect.Select date')}
                        </h2>

                        {/* Weekdays Header */}
                        <div
                          style={{
                            display: 'flex',
                            marginBottom: '10px',
                            alignItems: 'center',
                          }}
                        >
                          <div
                            style={{
                              width: '50px',
                              textAlign: 'center',
                              fontWeight: 'bold',
                            }}
                          >
                            {/* Month display if needed */}
                          </div>
                          {weekdays.map((day) => (
                            <div
                              key={day}
                              style={{
                                flex: 1,
                                textAlign: 'center',
                                fontWeight: 'bold',
                              }}
                            >
                              {day}
                            </div>
                          ))}
                        </div>

                        {/* Weeks */}
                        {calendar.map((week) => (
                          <div
                            key={week.weekNumber}
                            style={{
                              display: 'flex',
                              marginBottom: '5px',
                              alignItems: 'center',
                            }}
                          >
                            {/* Week Number */}
                            <div
                              style={{
                                width: '50px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                              }}
                            >
                              {week.weekNumber}
                            </div>

                            {/* Days */}
                            {week.days.map((date, index) => {
                              const selectable =
                                isDateSelectable(date) && !isWeekend(date);
                              const isSelected = isSameDay(
                                date,
                                selectedDate
                              );
                              const isCurrentDay = isToday(date);

                              // Determine if the month changes at this date
                              const monthChanges =
                                index > 0 &&
                                format(date, 'M') !==
                                  format(week.days[index - 1], 'M');

                              const monthLabel =
                                index === 0 ||
                                format(date, 'M') !==
                                  format(week.days[index - 1], 'M')
                                  ? format(date, 'MMMM', {
                                      locale:
                                        i18n.language === 'sv' ? sv : enUS,
                                    })
                                  : null;

                              return (
                                <React.Fragment key={date}>
                                  {monthChanges && index > 0 && (
                                    <div
                                      style={{
                                        width: '2px',
                                        height: '40px',
                                        backgroundColor:
                                          'var(--secondarycolor)',
                                        marginLeft: '3px',
                                        marginRight: '-5px',
                                        position: 'relative',
                                      }}
                                    />
                                  )}
                                  <div
                                    style={{
                                      flex: 1,
                                      textAlign: 'center',
                                      position: 'relative',
                                      margin:
                                        screenWidth < 580 ? '2px' : '4px',
                                      width: '100%',
                                      padding: 'auto 20px',
                                    }}
                                  >
                                    {monthLabel && (
                                      <div
                                        style={{
                                          position: 'absolute',
                                          top: '-15px',
                                          left: '50%',
                                          transform: 'translateX(-50%)',
                                          fontSize: '12px',
                                          fontWeight: 'bold',
                                        }}
                                      >
                                        {screenWidth < 580
                                          ? monthLabel.slice(0, 3)
                                          : monthLabel}
                                      </div>
                                    )}
                                    <button
                                      onClick={() =>
                                        selectable && setSelectedDate(date)
                                      }
                                      style={{
                                        margin: '4px',
                                        width: '100%',
                                        padding:
                                          screenWidth < 580
                                            ? '10px 8px'
                                            : '10px 20px',
                                        backgroundColor: isSelected
                                          ? 'var(--secondarycolor)'
                                          : isCurrentDay
                                          ? '#FDC12A' // Yellow color for current date
                                          : selectable
                                          ? 'var(--primarycolor)'
                                          : '#ccc',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: selectable
                                          ? 'pointer'
                                          : 'not-allowed',
                                      }}
                                      disabled={!selectable}
                                    >
                                      {format(date, 'd')}
                                    </button>
                                  </div>
                                </React.Fragment>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedDates.length >= 4 && (
                    <div
                      style={{
                        marginTop: '20px',
                        color: 'var(--secondarycolor)',
                        textAlign: 'center',
                      }}
                    >
                      {t(
                        'collect.You have selected the maximum number of times (4). Remove a time to select a new one.'
                      )}
                    </div>
                  )}

                  {/* Time Selection */}
                  {selectedDate && (
                    <div style={{ marginTop: '20px', padding: '0 20px' }}>
                      <h3 style={{ color: 'var(--secondarycolor)' }}>
                        {t('collect.Select time for')}{' '}
                        {format(selectedDate, 'yyyy-MM-dd')}
                      </h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {generateAvailableTimes(selectedDate).map(
                          (time, index) => (
                            <button
                              key={index}
                              onClick={() => handleTimeSelection(time)}
                              style={{
                                margin: '5px',
                                padding: '10px',
                                backgroundColor: 'var(--primarycolor)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                              }}
                            >
                              {format(time, 'HH:mm')}
                            </button>
                          )
                        )}
                        {/* Add the "whenever" button */}
                        <button
                          onClick={() =>
                            handleTimeSelection('whenever')
                          }
                          style={{
                            margin: '5px',
                            padding: '10px',
                            backgroundColor: 'var(--primarycolor)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                          }}
                        >
                          {t('collect.whenever')}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Display Selected Dates */}
                  <div
                    style={{ marginTop: '20px', padding: '0 20px' }}
                  >
                    <h3 style={{ color: 'var(--secondarycolor)', marginBottom: "10px" }}>
                      {`${t('collect.Selected times')} (${
                        selectedDates.length
                      }):`}
                    </h3>
                    {selectedDates.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '10px',
                        }}
                      >
                        <span>
                          {format(item.date, 'yyyy-MM-dd')}{' '}
                          {item.time === 'whenever'
                            ? t('collect.whenever')
                            : format(item.time, 'HH:mm')}
                        </span>
                        <button
                          onClick={() => handleDeleteDate(index)}
                          style={{
                            marginLeft: '10px',
                            cursor: 'pointer',
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '5px',
                          }}
                        >
                          {t('collect.Remove')}
                        </button>
                      </div>
                    ))}
                  </div>

                  <MailcontactCreate
                    selectedDates={selectedDates}
                    cartItems={cartItems}
                    totalPrice={totalPrice - patchDiscount}
                  />

                  {/* Terms and Conditions */}
                  
                  
                  
                </>
              ) : (
                /* Show message and button if total is less than 100 kr */
                <div
                  className="empty-cart"
                  style={{ textAlign: 'center', marginTop: '50px' }}
                >
                  <AiOutlineShopping
                    size={150}
                    color={'var(--secondarycolor)'}
                  />
                  <h3>
                    {t(
                      'collect.You must shop for at least 100 kr for pickup'
                    )}
                  </h3>
                  <Link href="/search">
                    <button type="button" className="btn">
                      {t('collect.Explore the range')}
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collect;

export const getServerSideProps = async () => {
  const query =
    '*[_type == "product" && minovve != true && showproduct == true]';
  const products = await client.fetch(query);

  const productss = products.map((product) => ({
    ...product,
    hiddenLink: 'https://www.studentshoppen.com/studentlivet',
  }));

  const ratingsQuery = '*[_type == "productratings"]';
  const ratingsData = await client.fetch(ratingsQuery);

  const announcementsQuery = '*[_type == "announcements"]';
  const announcements = await client.fetch(announcementsQuery);

  return {
    props: { products: productss, ratingsData, announcements },
  };
};