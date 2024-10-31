# Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open-source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the community Slack](https://slack.sanity.io/?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)


IMPORT DATA INTO SANITY, use ndjson file: 

 sanity dataset import testsampledata.ndjson production











____________________________________________________________________


chatgpt angående min create hemsida: 


hi, i have just created a new sanity database and would like to add a schema to the database and i need your help to set it up properly.

The webpage i am building is a page where the user can make custom prints for different types of products. 

im now gonna explain how the page will work and you will make a suggestion of how my database schemas can look.

When loading the page there should be different categories of product the user can select, 
(examples of products are, patches, scarfs, rollups, stickers, braclets, hipflasks, flags etc etc) it should be easy to add new product types. 


after selecting a product you want to make, in this case lets say patches, 

for some products (not all), you get to choose what type of patch you want to make (for example woven patch, embroidery patch or printed patch). 

after selecting the type of product you want (if it exsist), for most products, a price matrix should appear, to the left in the matrix should the sizes for the patches be and on top of the matrix should be the amount of patches ordered. both the sizes and quantities should be updatable inside sanity. 
so i want some way to be able to edit the prices for each of the matrix combinations, prefereably, maybe there should be a matrix in sanity i could edit the price in directly so its easyer to se the end result? if that is not possible, feel free to suggest another solution. 

after the user has selected a size/quantity/price for the product in the matrix, a calender should appear on the page, in this calender, the user should be able to select the date when they want the patches to be delivered. this function is so that i can increase the price if the customer wants a fast delivery, so in terms of the sanity database, i maybe should add something like ift its within the next X days, an extra price of Y is added to the total price or something like that, so for this i want to be able to set multiple prices depending on in how many days the customer wants their products, for example, if they want it within 10 days, they have to pay +500kr, and if they want it within 15 days +350kr, if they want it within 30 days +150kr and so on. 


After the user has selected which date they want the patches delivered, the next section for the page is the extras section, here the user can select addon services like for example design help, shipping cost and so on, these addon services could be formed a bit different, some may be an either or option for the user to select, some may be opt in  and so on, in sanity i should be able to select what kind of addon service it is, for example, for design help, the user should either be able to select, the patch is finished and pay 0 extra, we need a little help, price is 299kr and we need a lot of help 599-999kr,(so for this type we need a name eg little help, a price 299 and a description (the customers need light help with the design and smaller touchups)). while some other services should be just a yes and no question. however all options should have a price and name i think. 


After the addon section, the last section of the page should be the contact information page, here we dont need any info from sanity. 



so from the page i described to you above, how would you structure your sanity database code? 
I was thinking of 2 different alternatives, 

1) either have 1 table named after each product and then all the info about that product is inside that entry
or do you suggest any other method to structure my data? i want my data to be easily accessible and understandable. 


howo should i structure my sanity schema/schemas to make my page optimal to handle? 






















































now that i have the database fixed, i need help to implement the rest of the code for the actual website i described here: 


"hi, i have just created a new sanity database and would like to add a schema to the database and i need your help to set it up properly.

The webpage i am building is a page where the user can make custom prints for different types of products. 

im now gonna explain how the page will work and you will make a suggestion of how my database schemas can look.

When loading the page there should be different categories of product the user can select, 
(examples of products are, patches, scarfs, rollups, stickers, braclets, hipflasks, flags etc etc) it should be easy to add new product types. 


after selecting a product you want to make, in this case lets say patches, 

for some products (not all), you get to choose what type of patch you want to make (for example woven patch, embroidery patch or printed patch). 

after selecting the type of product you want (if it exsist), for most products, a price matrix should appear, to the left in the matrix should the sizes for the patches be and on top of the matrix should be the amount of patches ordered. both the sizes and quantities should be updatable inside sanity. 
so i want some way to be able to edit the prices for each of the matrix combinations, prefereably, maybe there should be a matrix in sanity i could edit the price in directly so its easyer to se the end result? if that is not possible, feel free to suggest another solution. 

after the user has selected a size/quantity/price for the product in the matrix, a calender should appear on the page, in this calender, the user should be able to select the date when they want the patches to be delivered. this function is so that i can increase the price if the customer wants a fast delivery, so in terms of the sanity database, i maybe should add something like ift its within the next X days, an extra price of Y is added to the total price or something like that, so for this i want to be able to set multiple prices depending on in how many days the customer wants their products, for example, if they want it within 10 days, they have to pay +500kr, and if they want it within 15 days +350kr, if they want it within 30 days +150kr and so on. 


After the user has selected which date they want the patches delivered, the next section for the page is the extras section, here the user can select addon services like for example design help, shipping cost and so on, these addon services could be formed a bit different, some may be an either or option for the user to select, some may be opt in  and so on, in sanity i should be able to select what kind of addon service it is, for example, for design help, the user should either be able to select, the patch is finished and pay 0 extra, we need a little help, price is 299kr and we need a lot of help 599-999kr,(so for this type we need a name eg little help, a price 299 and a description (the customers need light help with the design and smaller touchups)). while some other services should be just a yes and no question. however all options should have a price and name i think. 


After the addon section, the last section of the page should be the contact information page, here we dont need any info from sanity. 



so from the page i described to you above, how would you structure your sanity database code? 
I was thinking of 2 different alternatives, 

1) either have 1 table named after each product and then all the info about that product is inside that entry
or do you suggest any other method to structure my data? i want my data to be easily accessible and understandable. 


howo should i structure my sanity schema/schemas to make my page optimal to handle? 

"




currently i have this page i want the code in: 

import React, {useEffect, useState} from 'react';
import { siteName, siteNameAlt2, siteEmail } from '../../components/config';
import Navbar from '../../components/Navbar';
import { client } from '../../lib/client';
import { createclient } from '../../lib/createclient';



const Create = ({products, announcements, release, slcity, sluniversities}) => {


  return (
<div>
<Navbar announcements={announcements} release={release} productsss={products}/>

    </div>
  );
};

export const getServerSideProps = async () => { //also import import { client } from '../lib/client';

  const query = '*[_type == "product" && minovve != true && showproduct == true]';
  const products = await client.fetch(query);
  const productss = products.map(product => {
    return {
      ...product,
      hiddenLink: "https://www.studentshoppen.com/studentlivet"
    };
  });


  const announcementsQuery = '*[_type == "announcements"]';
  const announcements = await client.fetch(announcementsQuery);

  const releaseQuery = '*[_type == "release"]';
  const release = await client.fetch(releaseQuery);

  const createproductQuery = '*[_type == "createproduct" && show == true]';
  const createproduct = await createclient.fetch(createproductQuery);

  const createtypesQuery = '*[_type == "createtypes" && show == true]';
  const createtypes = await createclient.fetch(createtypesQuery);
  
  
  return {
    props: { products: productss, announcements, release, createproduct, createtypes },
  };
};

export default Create;






















































































thanks for everything, now my code works almost perfectly the way i want it, 
however i want to improve my delivery options code a bit inside the create.js code,

instead of having delivery options,
( { name: 'deliveryDays', title: 'Delivery Days', type: 'number' },
              { name: 'extraPrice', title: 'Extra Price', type: 'number' },)
 i would like to instead like to have a full fledged calender that shows in total of 5 weeks, then on top left of the callender should exist <> arrows that moves forward and backwards in the calender. 

all dates before the current date should be grayed out. 
in the calender, asside from each day having the date (for example 25/10)
under the date should the extra price be showed if the user want the product delivered by that date, 

to clarify, in my database i have the examples 12 days +400kr, and 18 days +300kr, for ( { name: 'deliveryDays', title: 'Delivery Days', type: 'number' },
              { name: 'extraPrice', title: 'Extra Price', type: 'number' },)
i also have a recently added field
  {
        name: 'minimumdeliverytime',
        title: 'minimum delivery time',
        type: 'number',
      },

this means the following, if the current date is 1st october and my minimum delivery date for the type is 7 days, the days (todays date should never be selectable) 2/10-9/10 should not be selectable for delivery, then we look at the delivery days and prices, so in this example we had 12 days and 18 days, so the 12 days after 9/10 (10/10-22/10) should be selectable, however then the user needs to pay an additional 400kr for the order if the user selects any of these dates, then since we have 18 days and +300kr, the next 6 days after that (23/10-28/10) the user instead pays 300kr extra instead of 400 extra if they want it delivered by that period, so from 29/10 and forward the user pays 0kr extra  since we have no more delivery day fees. (to summarize, the shortest amount of days price is applied first and they all start to count after the minimumdeliverydays time

remember i want the prices to show bellow the dates for each entry and i want to be able to go backwards and forwards inside the calender through arrow < and > buttons to the top right of the calender. 

i want you to use the same style for this calender as the calender style inside my collect.js code: 

this is the style: 

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
                    {/* ... (Your existing calendar code) */}
                    <div style={{ textAlign: 'left' }}>
                      <h2 style={{ color: 'var(--secondarycolor)', textAlign: 'center' }}>
                        {t('Välj datum')}
                      </h2>

                      {/* Weekdays Header */}
                      <div style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
                        <div style={{ width: '50px', textAlign: 'center', fontWeight: 'bold' }}>
                          {/* Month display if needed */}
                        </div>
                        {weekdays.map((day) => (
                          <div key={day} style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Weeks */}
                      {calendar.map((week) => (
                        <div
                          key={week.weekNumber}
                          style={{ display: 'flex', marginBottom: '5px', alignItems: 'center' }}
                        >
                          {/* Week Number */}
                          <div style={{ width: '50px', textAlign: 'center', fontWeight: 'bold' }}>
                            {week.weekNumber}
                          </div>

                          {/* Days */}
                          {week.days.map((date, index) => {
                            const selectable = isDateSelectable(date) && !isWeekend(date);
                            const isSelected = isSameDay(date, selectedDate);
                            const isCurrentDay = isToday(date);

                            // Determine if the month changes at this date
                            const monthChanges =
                              index > 0 && format(date, 'M') !== format(week.days[index - 1], 'M');

                            const monthLabel =
                              index === 0 || format(date, 'M') !== format(week.days[index - 1], 'M')
                                ? format(date, 'MMMM', { locale: i18n.language === 'sv' ? sv : enUS })
                                : null;

                            return (
                              <React.Fragment key={date}>
                                {monthChanges && index > 0 && (
                                  <div
                                    style={{
                                      width: '2px',
                                      height: '40px',
                                      backgroundColor: 'var(--secondarycolor)',
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
                                    margin: screenWidth < 580 ? '2px' : '4px',
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
                                      {screenWidth < 580 ? monthLabel.slice(0, 3) : monthLabel}
                                    </div>
                                  )}
                                  <button
                                    onClick={() => selectable && setSelectedDate(date)}
                                    style={{
                                      margin: '4px',
                                      width: '100%',
                                      padding: screenWidth < 580 ? '10px 8px' : '10px 20px',
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
                                      cursor: selectable ? 'pointer' : 'not-allowed',
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



and this is the full collect.js code for reference: 

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

            //Beställning godkändes
//


import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useStateContext } from '../context/StateContext';
import { useTranslation } from 'react-i18next';
import { client } from '../lib/client';
import Navbar from '../components/Navbar';
import { BsTrash3 } from 'react-icons/bs';
import { Mailcontact } from '../components';

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

  const weekdays = i18n.language === 'sv'
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

    while (isBefore(currentWeekStart, maxDate) || isEqual(currentWeekStart, maxDate)) {
      const weekStart = currentWeekStart;
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
      const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

      // Get months present in the week
      const monthsInWeek = [
        ...new Set(
          days.map((d) =>
            format(d, 'MMMM', { locale: i18n.language === 'sv' ? sv : enUS })
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
          const month = format(d, 'MMMM', { locale: i18n.language === 'sv' ? sv : enUS });
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
    const dayOfWeek = now.getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6
    const cutoffTimeToday = setHours(startOfDay(now), 7);

    // Helper function to get next Monday at 08:00 AM
    const nextMondayAtEight = () => {
      const daysUntilMonday = ((1 + 7 - now.getDay()) % 7) || 7;
      const nextMonday = addDays(startOfDay(now), daysUntilMonday);
      return setHours(nextMonday, 8);
    };

    if (
      (dayOfWeek === 5 && isAfter(now, cutoffTimeToday)) || // Friday after 07:00 AM
      dayOfWeek === 6 || // Saturday
      (dayOfWeek === 0 && isBefore(now, cutoffTimeToday)) // Sunday before 07:00 AM
    ) {
      // Set minSelectableDateTime to next Monday at 08:00 AM
      return nextMondayAtEight();
    } else {
      // Apply 24-hour rule with 07:00 AM cutoff
      const cutoffTime = setHours(startOfDay(now), 7);
      let minSelectableDateTime;
      if (isAfter(now, cutoffTime)) {
        minSelectableDateTime = addHours(now, 24);
      } else {
        minSelectableDateTime = cutoffTime;
      }

      // If minSelectableDateTime falls on a weekend, advance to next Monday at 08:00 AM
      while (isWeekend(minSelectableDateTime)) {
        minSelectableDateTime = addDays(startOfDay(minSelectableDateTime), 1);
      }

      // Set time to 08:00 AM
      minSelectableDateTime = setHours(startOfDay(minSelectableDateTime), 8);

      return minSelectableDateTime;
    }
  };

  // Function to check if a date is selectable
  const isDateSelectable = (date) => {
    const minSelectableDateTime = getMinSelectableDateTime();
    const minSelectableDate = startOfDay(minSelectableDateTime);
    const maxSelectableDate = addWeeks(startOfDay(new Date()), 3);

    return (
      !isWeekend(date) &&
      (isSameDay(date, minSelectableDate) || isAfter(date, minSelectableDate)) &&
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

    const minSelectableDateTime = getMinSelectableDateTime();

    while (currentTime <= endTime) {
      if (isSameDay(currentTime, minSelectableDateTime)) {
        if (isAfter(currentTime, minSelectableDateTime) || isEqual(currentTime, minSelectableDateTime)) {
          times.push(new Date(currentTime));
        }
      } else if (isAfter(currentTime, minSelectableDateTime)) {
        times.push(new Date(currentTime));
      }
      currentTime = addMinutes(currentTime, interval);
    }

    return times;
  };

  // Handle time selection
  const handleTimeSelection = (dateTime) => {
    if (selectedDates.length >= 4) {
      setDateTimeError(t('Du kan maximalt välja 4 tider.'));
      return;
    }
    setSelectedDates((prevDates) => [...prevDates, { date: selectedDate, time: dateTime }]);
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
        week.days.map((date) => format(date, 'MMM', { locale: i18n.language === 'sv' ? sv : enUS }))
      )
    ),
  ];

  return (
    <div>
      <Navbar announcements={announcements} release={release} productsss={products} />

      <div className="parent-container">
        <div className="privacy-policy-container">
          <div>
            <h1 style={{ textAlign: 'center', marginTop: '20px', color: 'var(--secondarycolor)' }}>
              {t('collect.Hämta i Linköping')}
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
              <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <span
                  className="heading"
                  style={{ color: 'var(--secondarycolor)', fontSize: '24px', fontWeight: 'bold' }}
                >
                  {t('cart.Din kundvagn')}
                </span>
                <span className="cart-num-items" style={{ marginLeft: '5px' }}>
                  ({totalQuantities} {t('cart.varor')})
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
            <div className="empty-cart" style={{ textAlign: 'center', marginTop: '50px' }}>
              <AiOutlineShopping size={150} color={'var(--secondarycolor)'} />
              <h3>{t('cart.Din kundvagn är tom')}</h3>
              <Link href="/">
                <button type="button" className="btn">
                  {t('cart.Fortsätt handla')}
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
                        borderBottom: index !== cartItems.length - 1 ? '1px #ccc solid' : 'none',
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
                        <div className="flex2 top" style={{ display: 'inline-block' }}>
                          <Link href={`/product/${item.slug.current}`}>
                            <div className="image-hover-effect-text">
                              <h5 className="h5collect" style={{ color: 'var(--secondarycolor)' }}>
                                {i18n.language === 'sv'
                                  ? item.name
                                  : item.nameeng || item.name}{' '}
                                {item.hasPatchesTag && t('universal.imärke')}
                              </h5>
                            </div>
                          </Link>
                          {item.selectedVariation && (
                            <h4>
                              {i18n.language === 'sv' || !item.selectedVariation.nameeng
                                ? `(${item.selectedVariation.name})`
                                : `(${item.selectedVariation.nameeng})`}
                            </h4>
                          )}
                          <h4
                            className="price"
                            style={{
                              color: item.previousprice ? 'var(--oldprimary)' : 'var(--textetc)',
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
                            item.selectedVariation ? 'flex bottomvariation' : 'flex bottom'
                          }
                        >
                          <div>
                            <p className="quantity-desc" style={{ marginTop: '-20px' }}>
                              <span
                                className="minus"
                                onClick={() => toggleCartItemQuanitity(item.id, 'dec')}
                              >
                                <AiOutlineMinus />
                              </span>
                              <span className="num">{item.quantity}</span>
                              <span
                                className="plus"
                                onClick={() => toggleCartItemQuanitity(item.id, 'inc')}
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
                  <h3 style={{ color: 'var(--secondarycolor)' }}>{t('cart.Summa')}:&nbsp;</h3>
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
                    {/* ... (Your existing calendar code) */}
                    <div style={{ textAlign: 'left' }}>
                      <h2 style={{ color: 'var(--secondarycolor)', textAlign: 'center' }}>
                        {t('Välj datum')}
                      </h2>

                      {/* Weekdays Header */}
                      <div style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
                        <div style={{ width: '50px', textAlign: 'center', fontWeight: 'bold' }}>
                          {/* Month display if needed */}
                        </div>
                        {weekdays.map((day) => (
                          <div key={day} style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Weeks */}
                      {calendar.map((week) => (
                        <div
                          key={week.weekNumber}
                          style={{ display: 'flex', marginBottom: '5px', alignItems: 'center' }}
                        >
                          {/* Week Number */}
                          <div style={{ width: '50px', textAlign: 'center', fontWeight: 'bold' }}>
                            {week.weekNumber}
                          </div>

                          {/* Days */}
                          {week.days.map((date, index) => {
                            const selectable = isDateSelectable(date) && !isWeekend(date);
                            const isSelected = isSameDay(date, selectedDate);
                            const isCurrentDay = isToday(date);

                            // Determine if the month changes at this date
                            const monthChanges =
                              index > 0 && format(date, 'M') !== format(week.days[index - 1], 'M');

                            const monthLabel =
                              index === 0 || format(date, 'M') !== format(week.days[index - 1], 'M')
                                ? format(date, 'MMMM', { locale: i18n.language === 'sv' ? sv : enUS })
                                : null;

                            return (
                              <React.Fragment key={date}>
                                {monthChanges && index > 0 && (
                                  <div
                                    style={{
                                      width: '2px',
                                      height: '40px',
                                      backgroundColor: 'var(--secondarycolor)',
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
                                    margin: screenWidth < 580 ? '2px' : '4px',
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
                                      {screenWidth < 580 ? monthLabel.slice(0, 3) : monthLabel}
                                    </div>
                                  )}
                                  <button
                                    onClick={() => selectable && setSelectedDate(date)}
                                    style={{
                                      margin: '4px',
                                      width: '100%',
                                      padding: screenWidth < 580 ? '10px 8px' : '10px 20px',
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
                                      cursor: selectable ? 'pointer' : 'not-allowed',
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
            <div style={{ marginTop: '20px', color: 'var(--secondarycolor)', textAlign: 'center' }}>
              {t('Du har valt maximalt antal tider (4). Ta bort en tid för att välja en ny.')}
            </div>
          )}

                  {/* Time Selection */}
                  {selectedDate && (
            <div style={{ marginTop: '20px', padding: '0 20px' }}>
              <h3 style={{ color: 'var(--secondarycolor)' }}>
                {t('Välj tid för')} {format(selectedDate, 'yyyy-MM-dd')}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {generateAvailableTimes(selectedDate).map((time, index) => (
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
                ))}
                {/* Add the "när som" button */}
                <button
                  onClick={() => handleTimeSelection('whenever')}
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
                  {t('när som')}
                </button>
              </div>
            </div>
          )}

          {/* Display Selected Dates */}
          <div style={{ marginTop: '20px', padding: '0 20px' }}>
            <h3 style={{ color: 'var(--secondarycolor)' }}>
              {`${t('Valda tider')} (${selectedDates.length}):`}
            </h3>
            {selectedDates.map((item, index) => (
              <div
                key={index}
                style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
              >
                <span>
                  {format(item.date, 'yyyy-MM-dd')}{' '}
                  {item.time === 'whenever' ? t('när som') : format(item.time, 'HH:mm')}
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
                  {t('Ta bort')}
                </button>
              </div>
            ))}
          </div>

          <Mailcontact
            selectedDates={selectedDates}
            cartItems={cartItems}
            totalPrice={totalPrice - patchDiscount}
          />

                  {/* Terms and Conditions */}
                  <div
                    className="terms"
                    style={{ marginTop: '40px', padding: '0 20px', lineHeight: '1.6' }}
                  >
                    <p>{t('collect.TermsText')}</p>
                  </div>

                  {/* Google Map */}
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
                </>
              ) : (
                /* Show message and button if total is less than 100 kr */
                <div className="empty-cart" style={{ textAlign: 'center', marginTop: '50px' }}>
                  <AiOutlineShopping size={150} color={'var(--secondarycolor)'} />
                  <h3>{t('Du måste handla för minst 100 kr för avhämtning')}</h3>
                  <Link href="/search">
                    <button type="button" className="btn">
                      {t('Utforska sortimentet')}
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
    const query = '*[_type == "product" && minovve != true && showproduct == true]';
    const products = await client.fetch(query);

    const productss = products.map(product => ({
        ...product,
        hiddenLink: "https://www.studentshoppen.com/studentlivet"
    }));

    const ratingsQuery = '*[_type == "productratings"]';
    const ratingsData = await client.fetch(ratingsQuery);

    const announcementsQuery = '*[_type == "announcements"]';
    const announcements = await client.fetch(announcementsQuery);

    return {
        props: { products: productss, ratingsData, announcements },
    };
};


this is the create.js code i want you to improve: 

import React, { useState, useEffect } from 'react';
import { client } from '../lib/client';
import { createclient , urlForCreate} from '../lib/createclient';
import Navbar from '../components/Navbar';
import 'react-datepicker/dist/react-datepicker.css';

const Create = ({ products, types, announcements, release, productsss }) => {
  // State variables
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [availableTypes, setAvailableTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPriceEntry, setSelectedPriceEntry] = useState(null);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [step, setStep] = useState(1); // Optional, if you want to track steps

  // Handle Add-On Services Change
  const handleAddOnChange = (service, option) => {
    const existingAddOn = selectedAddOns.find((addOn) => addOn.serviceKey === service._key);
    if (existingAddOn) {
      // Update existing add-on
      setSelectedAddOns(
        selectedAddOns.map((addOn) =>
          addOn.serviceKey === service._key ? { ...addOn, option } : addOn
        )
      );
    } else {
      // Add new add-on
      setSelectedAddOns([...selectedAddOns, { serviceKey: service._key, option }]);
    }
  };

  // Calculate Total Price
  const calculateTotalPrice = () => {
    let total = 0;
    if (selectedPriceEntry) total += selectedPriceEntry.price;
    if (selectedDeliveryOption) total += selectedDeliveryOption.extraPrice;
    if (selectedAddOns.length > 0) {
      total += selectedAddOns.reduce((sum, addOn) => {
        if (addOn.option) {
          return sum + addOn.option.price;
        }
        return sum;
      }, 0);
    }
    setTotalPrice(total);
  };

  // Call calculateTotalPrice whenever relevant state changes
  useEffect(() => {
    calculateTotalPrice();
  }, [selectedPriceEntry, selectedDeliveryOption, selectedAddOns]);

  // Define your primary and secondary colors
  const primaryColor = '#0070f3'; // Replace with your primary color
  const secondaryColor = '#333'; // Replace with your secondary color

  // Step 1: Product Selection
  const renderProductSelection = () => (
    <div style={{ marginBottom: '40px' }}>
      <h1 style={{ textAlign: 'left', marginBottom: '20px' }}>Select a Product</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              flex: '1 1 calc(33.333% - 20px)',
              maxWidth: 'calc(33.333% - 20px)',
              backgroundColor: '#f5f5f5',
              borderRadius: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              padding: '10px',
              boxSizing: 'border-box',
              ...(selectedProduct && selectedProduct._id === product._id
                ? { border: `2px solid ${primaryColor}` }
                : {}),
            }}
            onClick={() => {
              setSelectedProduct(product);
              setSelectedType(null);
              setSelectedPriceEntry(null);
              setSelectedDeliveryOption(null);
              setSelectedAddOns([]);
              setContactInfo({ name: '', email: '', phone: '' });
              // Check if product has types
              if (product.contentTypes && product.contentTypes.length > 0) {
                // Get the types for this product
                const productTypes = types.filter((type) =>
                  product.contentTypes.some((ref) => ref._ref === type._id)
                );
                setAvailableTypes(productTypes);
              } else {
                setAvailableTypes([]);
              }
            }}
          >
           {product.image && (
  <img
    src={urlForCreate(product.image).url()}
    alt={product.name}
    style={{
      width: '100%',
      objectFit: 'cover',
      borderRadius: '20px',
      aspectRatio: '2 / 1',
    }}
  />
)}
            <h3 style={{ marginTop: '10px', fontSize: '18px' }}>{product.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 2: Product Type Selection
  const renderTypeSelection = () => {
    if (!selectedProduct || availableTypes.length === 0) return null;

    return (
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ textAlign: 'left', marginBottom: '20px' }}>
          Select a Type for {selectedProduct.name}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {availableTypes.map((type) => (
            <div
              key={type._id}
              style={{
                flex: '1 1 calc(25% - 20px)',
                maxWidth: 'calc(25% - 20px)',
                backgroundColor: '#f5f5f5',
                borderRadius: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                padding: '10px',
                boxSizing: 'border-box',
                ...(selectedType && selectedType._id === type._id
                  ? { border: `2px solid ${primaryColor}` }
                  : {}),
              }}
              onClick={() => {
                setSelectedType(type);
                setSelectedPriceEntry(null);
                setSelectedDeliveryOption(null);
                setSelectedAddOns([]);
                setContactInfo({ name: '', email: '', phone: '' });
              }}
            >
              {type.image && (
                <img
                  src={urlForCreate(type.image).url()}
                  alt={type.name}
                  style={{
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: '20px',
                    aspectRatio: '1 / 1',
                  }}
                />
              )}
              <h3 style={{ marginTop: '10px', fontSize: '18px' }}>{type.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Step 3: Price Matrix Selection
  const renderPriceMatrix = () => {
    // Use optional chaining and ensure priceMatrix exists
    const priceMatrix = selectedType?.priceMatrix || selectedProduct?.priceMatrix;
  
    // Safely return null if priceMatrix is not available
    if (!priceMatrix) return null;
  
    // Get unique sizes and quantities
    const sizes = [...new Set(priceMatrix.map((entry) => entry.size))];
    const quantities = [...new Set(priceMatrix.map((entry) => entry.quantity))];
  
    // Build matrix
    const buildMatrix = () => {
      return sizes.map((size) => {
        const row = {
          size,
          prices: quantities.map((quantity) => {
            const entry = priceMatrix.find(
              (e) => e.size === size && e.quantity === quantity
            );
            return entry || null;
          }),
        };
        return row;
      });
    };
  
    const matrix = buildMatrix();
  
    return (
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ textAlign: 'left', marginBottom: '20px' }}>Select Size and Quantity</h1>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', textAlign: 'center', padding: '10px' }}>
                Size
              </th>
              {quantities.map((quantity) => (
                <th
                  key={quantity}
                  style={{ border: '1px solid #ccc', textAlign: 'center', padding: '10px' }}
                >
                  {quantity} units
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row) => (
              <tr key={row.size}>
                <td style={{ border: '1px solid #ccc', textAlign: 'center', padding: '10px' }}>
                  {row.size}
                </td>
                {row.prices.map((entry, index) => (
                  <td
                    key={index}
                    style={{ border: '1px solid #ccc', textAlign: 'center', padding: '10px' }}
                  >
                    {entry ? (
                      <button
                        style={{
                          backgroundColor:
                            selectedPriceEntry && selectedPriceEntry._key === entry._key
                              ? primaryColor
                              : secondaryColor,
                          color:
                            selectedPriceEntry && selectedPriceEntry._key === entry._key
                              ? secondaryColor
                              : 'white',
                          padding: '10px',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setSelectedPriceEntry(entry);
                          setSelectedDeliveryOption(null);
                          setSelectedAddOns([]);
                          setContactInfo({ name: '', email: '', phone: '' });
                        }}
                      >
                        {entry.price} kr
                      </button>
                    ) : (
                      '-'
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Step 4: Delivery Options
  // Step 4: Delivery Options
const renderDeliveryOptions = () => {
  // Use optional chaining to safely access deliveryPrices
  const deliveryPrices = selectedType?.deliveryPrices || selectedProduct?.deliveryPrices;

  // Safely return null if selectedPriceEntry or deliveryPrices is not available
  if (!selectedPriceEntry || !deliveryPrices) return null;

  return (
    <div style={{ marginBottom: '40px' }}>
      <h1 style={{ textAlign: 'left', marginBottom: '20px' }}>Select Delivery Option</h1>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {deliveryPrices.map((option) => (
          <button
            key={option._key}
            style={{
              backgroundColor:
                selectedDeliveryOption && selectedDeliveryOption._key === option._key
                  ? primaryColor
                  : '#e0e0e0',
              color:
                selectedDeliveryOption && selectedDeliveryOption._key === option._key
                  ? 'white'
                  : '#000',
              padding: '10px 20px',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => {
              setSelectedDeliveryOption(option);
              setSelectedAddOns([]);
              setContactInfo({ name: '', email: '', phone: '' });
            }}
          >
            {option.deliveryDays} days (+{option.extraPrice} kr)
          </button>
        ))}
      </div>
    </div>
  );
};

  // Step 5: Add-On Services
  const renderAddOns = () => {
    const addOnServices = selectedType?.addOnServices || selectedProduct?.addOnServices;
  
    // Return null if addOnServices or selectedDeliveryOption does not exist
    if (!selectedDeliveryOption || !addOnServices) return null;
  
    return (
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ textAlign: 'left', marginBottom: '20px' }}>Select Add-On Services</h1>
        {addOnServices.map((service) => (
          <div key={service._key} style={{ marginBottom: '20px' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>{service.name}</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {service.type === 'singleChoice' &&
                service.options.map((option) => (
                  <button
                    key={option._key}
                    style={{
                      backgroundColor:
                        selectedAddOns.some(
                          (addOn) =>
                            addOn.serviceKey === service._key && addOn.option._key === option._key
                        )
                          ? primaryColor
                          : '#e0e0e0',
                      color:
                        selectedAddOns.some(
                          (addOn) =>
                            addOn.serviceKey === service._key && addOn.option._key === option._key
                        )
                          ? 'white'
                          : '#000',
                      padding: '10px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleAddOnChange(service, option)}
                  >
                    {option.optionName} (+{option.price} kr)
                  </button>
                ))}
              {service.type === 'boolean' && (
                <button
                  style={{
                    backgroundColor: selectedAddOns.some(
                      (addOn) => addOn.serviceKey === service._key
                    )
                      ? primaryColor
                      : '#e0e0e0',
                    color: selectedAddOns.some((addOn) => addOn.serviceKey === service._key)
                      ? 'white'
                      : '#000',
                    padding: '10px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    handleAddOnChange(
                      service,
                      selectedAddOns.some((addOn) => addOn.serviceKey === service._key)
                        ? null
                        : { price: service.price }
                    )
                  }
                >
                  {service.name} (+{service.price} kr)
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Step 6: Contact Information
  const renderContactInformation = () => {
    if (!selectedDeliveryOption) return null;

    const handleSubmit = (e) => {
      e.preventDefault();
      // Submit the order
      // For now, we'll just display the summary
      setStep(7);
    };

    return (
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ textAlign: 'left', marginBottom: '20px' }}>Contact Information</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <label style={{ display: 'flex', flexDirection: 'column' }}>
            Name:
            <input
              type="text"
              value={contactInfo.name}
              onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
              required
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column' }}>
            Email:
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              required
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column' }}>
            Phone:
            <input
              type="tel"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              required
            />
          </label>
          <button type="submit" style={{ backgroundColor: primaryColor, color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>
            Submit Order
          </button>
        </form>
      </div>
    );
  };

  // Step 7: Order Summary
  const renderOrderSummary = () => {
    if (step !== 7) return null;
  
    return (
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ textAlign: 'left', marginBottom: '20px' }}>Order Summary</h1>
        <p>
          <strong>Product:</strong> {selectedProduct?.name || 'Not selected'}
        </p>
        {selectedType && (
          <p>
            <strong>Type:</strong> {selectedType.name}
          </p>
        )}
        <p>
          <strong>Size:</strong> {selectedPriceEntry?.size || 'Not selected'}
        </p>
        <p>
          <strong>Quantity:</strong> {selectedPriceEntry?.quantity || 'Not selected'}
        </p>
        <p>
          <strong>Base Price:</strong> {selectedPriceEntry?.price ? `${selectedPriceEntry.price} kr` : 'Not selected'}
        </p>
        <p>
          <strong>Delivery Option:</strong> {selectedDeliveryOption?.deliveryDays || 'Not selected'} days (+{selectedDeliveryOption?.extraPrice || 0} kr)
        </p>
        {selectedAddOns.length > 0 && (
          <div>
            <strong>Add-Ons:</strong>
            <ul>
              {selectedAddOns.map((addOn) => {
                const service = (selectedType ? selectedType.addOnServices : selectedProduct.addOnServices)?.find(
                  (s) => s._key === addOn.serviceKey
                );
                return (
                  <li key={addOn.serviceKey}>
                    {service?.name}: {addOn.option ? `${addOn.option.optionName} (+${addOn.option.price} kr)` : ''}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <p>
          <strong>Total Price:</strong> {totalPrice} kr
        </p>
        <p>
          <strong>Contact Info:</strong> {contactInfo.name}, {contactInfo.email}, {contactInfo.phone}
        </p>
        <p>Thank you for your order!</p>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Navbar announcements={announcements} release={release} productsss={productsss} />
      {renderProductSelection()}
      {renderTypeSelection()}
      {renderPriceMatrix()}
      {renderDeliveryOptions()}
      {renderAddOns()}
      {renderContactInformation()}
      {renderOrderSummary()}
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product" && minovve != true && showproduct == true]';
  const productss = await client.fetch(query);
  const productsss = productss.map((product) => {
    return {
      ...product,
      hiddenLink: 'https://www.studentshoppen.com/studentlivet',
    };
  });

  const announcementsQuery = '*[_type == "announcements"]';
  const announcements = await client.fetch(announcementsQuery);

  const releaseQuery = '*[_type == "release"]';
  const release = await client.fetch(releaseQuery);

  const createproductQuery = '*[_type == "createproduct" && show == true]';
  const products = await createclient.fetch(createproductQuery);

  const createtypesQuery = '*[_type == "createtypes" && show == true]';
  const types = await createclient.fetch(createtypesQuery);

  return {
    props: {
      productss: productsss,
      announcements,
      release,
      types,
      products,
    },
  };
};

export default Create;
