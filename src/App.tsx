import React from 'react';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; 
import Header from './Components/Header';
import Picture from './Components/Picture';
import SetFavBtn from './Components/SetFavBtn';
import DatePicker from './Components/DatePicker';
import Description from './Components/Description';
import Loader from './Components/Loader';
import NavBtn from './Components/NavBtn';

const BASE_URL = 'https://api.nasa.gov/planetary/apod?api_key=dupTu9v14FYyUUnhYyaVdHNkcSPpROIkHcDD4V3R';

const formateDate: (dateToFormate: Date) => string = (dateToFormate: Date) => {
  const year = dateToFormate.getFullYear();
  const month = (dateToFormate.getMonth() + 1);
  const day = dateToFormate.getDate();
  return `${year}-${month.toString().length === 1 ? `0${month}` : month}-${day.toString().length === 1 ? `0${day}` : day}`;
}

interface PictureObj {
  title: string;
  url: string;
  explanation: string;
  date: string;
}

const App: React.FC = () => {
  const [pictureObj, setPictureObj] = useState<PictureObj>({
    title: '',
    explanation: '',
    url: '',
    date: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [date, setDate] = useState<string>(formateDate(new Date()));
  const [seenPictures, setSeenPictures] = useState<Array<PictureObj>>([])

  useEffect(() => {
    setIsLoading(true);
    const seen = seenPictures?.find((picture) => picture.date === date);
    if (seen?.date) {
      setIsLoading(false);
      setPictureObj(seen);
    } else {
      Axios.get(`${BASE_URL}&date=${date}`)
      .then((response) => {
        setIsLoading(false);
        setPictureObj(response.data);
        seenPictures?.push(response.data);
        setSeenPictures(seenPictures);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.toString() === 'Error: Network Error') {
          toast('Network error, check your internet connection');
          return
        }
        if (error.response?.data.error) {
          toast(error.response.data.error.message);
          return;
        }
        toast(error.response.data.msg);
      });
    }
  }, [date, seenPictures]);


  const getPictureByDate: (date: string) => void = (date: string) => {
    setDate(date);
  }

  const handleDateByNavigation: (type: string) => void = (type: string) => {
    const newDate = new Date(date);
    let calculatedDate;
    if (type === 'prev') {
      calculatedDate = newDate.setDate(newDate.getDate() - 1);
    } else {
      calculatedDate = newDate.setDate(newDate.getDate() + 1);
    }
    const derivedDate = new Date(calculatedDate);
    setDate(formateDate(derivedDate));
  }

  const addFavorite: (type: string) => void = () => {
    const favourites = JSON.parse(window.localStorage.getItem('favourites') || '[]');
    const favourited = favourites.find((favourite: PictureObj) => favourite.date === pictureObj.date);
    if (favourited.date) {
      toast('Picure already set is Favourite!');
      return;
    }
    favourites.push(pictureObj);
    toast('Picure set is Favourite!');
    return;
  }

  const {
    title,
    url,
    explanation
  } = pictureObj;

  return (
    <div className="App">
      <ToastContainer />
      {
        isLoading && <Loader />
      }
      <Header title={title} />
      <div className="picture-wrapper">
        <NavBtn btnType="prev" handleClick={handleDateByNavigation} />
        <Picture image={url} title={title} />
        <NavBtn btnType="next" handleClick={handleDateByNavigation} />
      </div>
      <div className="button-wrapper">
        <SetFavBtn handleOnClick={addFavorite} />
        <DatePicker date={date} getPictureByDate={getPictureByDate} />
      </div>
      <Description description={explanation} />
    </div>
  );
}

export default App;
