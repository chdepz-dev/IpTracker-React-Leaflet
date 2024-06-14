import React, { useEffect } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'
import Icon from './Icon';
const MarkerPosition = ({data}) => {
    let position ;
    if(data){
        position = [data.location.latitude, data.location.longitude];
    }
    const map = useMap();
    useEffect(() => {
        map.flyTo(position, 13,{
            animate: true,
        })
    }, [map, position])
  return (
   <Marker position={position} icon={Icon}>
    <Popup>
        you are here
    </Popup>
   </Marker>
  )
}

export default MarkerPosition