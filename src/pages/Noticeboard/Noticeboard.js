import React, { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import './Noticeboard.css';
import {useParams} from "react-router-dom";
import { useEffect } from 'react';
import SearchBar from './Searchbar';
import Carousel from 'react-elastic-carousel';
import Card from './Card';


const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];



export default function Noticeboard() {


  const [Notificationdata, setData] = React.useState([]);
  const [selectedOption, setSelectedOption] = useState('9th');
  const [searchTerm, setSearchTerm] = useState('1990');
  const [isprocessing, setIsprocessing] = useState(false);
  const[semesterviseNotification, setSemesterviseNotification]=useState([]);
  
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };


  const fetchNotification = async () => {
    try {
      setIsprocessing(true)
      let url=`http://localhost:8080/api/fetchby/${searchTerm}/${selectedOption}`;
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      setSemesterviseNotification(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    finally{
      setIsprocessing(false)
    }
  }


  useEffect(() => {
    // Call the API here
    fetch('http://localhost:8080/api/fetchNotification')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        // Handle the error here
        console.log(error);
        // Display an error message to the user
        alert('Error fetching data from API');
      });
  }, []);


 


  const Data = [
    { id: 1, title: 'Notification for rechecking 2023', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aspernatur perferendis assumenda quaerat quidem ipsam, veritatis, blanditiis fugit voluptatibus libero amet esse nostrum eveniet inventore error exercitationem eum vel consequatur" },
    { id: 2, title: 'Notification for Dues ', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aspernatur perferendis assumenda quaerat quidem ipsam, veritatis, blanditiis fugit voluptatibus libero amet esse nostrum eveniet inventore error exercitationem eum vel consequatur" },
    { id: 3, title: 'Notification for Date Extension Spring 2023', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aspernatur perferendis assumenda quaerat quidem ipsam, veritatis, blanditiis fugit voluptatibus libero amet esse nostrum eveniet inventore error exercitationem eum vel consequatur" },
    { id: 4, title: 'Notification for rechecking 2023', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aspernatur perferendis assumenda quaerat quidem ipsam, veritatis, blanditiis fugit voluptatibus libero amet esse nostrum eveniet inventore error exercitationem eum vel consequatur" },
    { id: 5, title: 'Notification for Date Extension Spring 2023', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aspernatur perferendis assumenda quaerat quidem ipsam, veritatis, blanditiis fugit voluptatibus libero amet esse nostrum eveniet inventore error exercitationem eum vel consequatur" },
    { id: 6, title: 'Notification for Dues', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aspernatur perferendis assumenda quaerat quidem ipsam, veritatis, blanditiis fugit voluptatibus libero amet esse nostrum eveniet inventore error exercitationem eum vel consequatur" },
    { id: 7, title: 'Notification for Date Extension Spring 2023', description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aspernatur perferendis assumenda quaerat quidem ipsam, veritatis, blanditiis fugit voluptatibus libero amet esse nostrum eveniet inventore error exercitationem eum vel consequatur" },
    { id: 8, title: 'Notification for rechecking 2023', description: "Lorem ipsum dolor sit  vel consequatur" },
   
  ];


    const userId = useParams().id;
    const loadedNotification = Data.filter(notification => notification.id === userId);
    console.log(loadedNotification);
  
 

    const handleSearch = (searchTerm) => {
      setSearchTerm(searchTerm);
      
    };

  return (
    <div>
      <Navbar />
      <section className=" mainhomepagediv">
        <div className='container text-center pt-5 pb-1 upperTextbox'>
            <p className='h3'>Computer Science and Information Technology</p>
            <p>University of Engineering & Technology Peshawar</p>
            <p className='h3'>Notifications</p>
        </div>
      </section>
      <div >
      <select className="form-select mt-2" value={selectedOption} onChange={handleSelectChange}>
            <option value="">Select Semester</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="5th">5th</option>
            <option value="6th">6th</option>
            <option value="7th">7th</option>
            <option value="8th">8th</option>
          </select>
        <SearchBar onChange={handleSearch} value={searchTerm} />
        <button className='btn btn-warning px-5 text-center' onClick={fetchNotification}>Search</button>
        {isprocessing && <p>Result Processing...</p>}
      </div>
      

      <section className='container-fluid p-0 m-0 noticeboardSection'>
       <div className='container carasolUpperdiv '>
       
       <Carousel breakPoints={breakPoints}>
          {Notificationdata.map((item, key) => <Card id={item._id} title={item.title} description={item.description} image={item.image} />)}
         
        </Carousel>
       </div>
      </section>

      
      <h1 className='text-white'>Semester and year wise notification</h1>
      {
       //if semesterviseNotification is not empty then show the data
        semesterviseNotification.length>0 ? semesterviseNotification.map((item, key) => <Card id={item._id} title={item.title} description={item.description} image={item.image} />) : <p>No data found</p>
      }
      <Footer />
    </div>
  )
}
