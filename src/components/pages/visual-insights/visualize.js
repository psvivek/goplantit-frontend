// const MAPBOX_TOKEN = "pk.eyJ1Ijoic2F0eWF2aXZlayIsImEiOiJja2V4ejVkam8zNGhkMnNwbmRmN3VjYzFsIn0.x3SWl6lWW5zPYL8mmhfRWw"; // eslint-disable-line
import React, {Fragment} from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {ColumnLayer} from '@deck.gl/layers';
import styled from "styled-components";

import YieldData from "./yield.json"
import Timeseries from "./timeseries"
import Profitseries from "./profitseries"
import serviceTemplate from "../../layout/serviceTemplate";
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import {
  Typography,
  Box,
  Paper,
  Grid
} from "@material-ui/core";


////Styled components
const ComponentWrapper = styled.section`
  position: relative;
  max-width: 100%;
  margin-top: 20px;
  height: 50vh;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const SecondTitle = styled(Typography)`
  font-weight: 500;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const PaperWrapper = styled(Paper)`
  background-color: #fffafa !important;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 70vh;
  padding: 10px;
`;

const PaperGridWrapper = styled(Grid)`
  height: 100%;
  padding-left: 0px !important;
`;
const ComponentGrid = styled(Grid)`
  height: 100%;
  margin: 20px 0px 0px 0px;
`;

const Arti = styled(Card)`
  display: flex;
  width: 42%;
  margin-top: 2%;
  margin-left: 56%;
  background: #ffffff;
  
`;

const ArtiSuggest = styled(Card)`
  display: flex;
  width: 40%;
  margin-top: 2%;
  margin-left: 2%;
  background: #ffffff;
  
`;

const Title = styled(Typography)`
  display: flex;
  margin-bottom: 5px;
  font-weight: 500;
  // height: 50px;
  color: black;
`;

const CardContentWrapper = styled(CardContent)`
  width: 100%;
`;

const ColorBlock = styled(Typography)`
  width: 50px; 
  height: 15px; 
  border-radius: 3px;
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


// Set your mapbox token here
const MAPBOX_TOKEN = "pk.eyJ1Ijoic2F0eWF2aXZlayIsImEiOiJja2V4ejVkam8zNGhkMnNwbmRmN3VjYzFsIn0.x3SWl6lWW5zPYL8mmhfRWw"; // eslint-disable-line

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000]
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000]
});

const lightingEffect = new LightingEffect({ambientLight, pointLight1, pointLight2});

const INITIAL_VIEW_STATE = {
  longitude: 133.16,
  latitude: -26.26,
  zoom: 3.0,
  maxZoom: 16,
  pitch: 50,
  // bearing: 0
};

function getTooltip({object}) {
  if (!object) {
    return null;
  }
  const crop = object.Crop;
  const yieldNum = object.yield.toFixed(2);
  const year = object.Year

  return `\
    Crop: ${crop} \nYield: ${yieldNum} t/ht\nYear: ${year}`;
}

function getLegend() {  
  return (

    <Arti>
      <CardContentWrapper>
        <Title variant="subtitle2'" style={{fontSize: "16px"}}>
          Legend
        </Title>
        <table color='primary'>
          <tbody>
            <tr>
              <td>
                <ColorBlock style={{backgroundColor: 'rgb(92, 192, 192)'}}></ColorBlock>
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "wheat.png"} style={{width: '10%', height: '2%', marginRight: '10%'}} alt='Wheat'/>
                Wheat
              </td>
            </tr>

            <tr>
              <td>
                <ColorBlock style={{backgroundColor: 'rgb(67,67,72'}}></ColorBlock>
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "barley.png"} style={{width: '10%', height: '2%', marginRight: '10%'}} alt='Barley'/>
                Barley
              </td>
            </tr>

            <tr>
              <td>
                <ColorBlock style={{backgroundColor: 'rgb(144,237,125)'}}></ColorBlock>
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "canola.png"} style={{width: '10%', height: '2%', marginRight: '10%'}} alt='Canola'/>
                Canola
              </td>
            </tr>

            <tr>
              <td>
                <ColorBlock style={{backgroundColor: 'rgb(247,163,92)'}}></ColorBlock>
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "sorghum.png"} style={{width: '10%', height: '2%', marginRight: '10%'}} alt='Sorghum'/>
                Sorghum
              </td>
            </tr>

            <tr>
              <td>
                <ColorBlock style={{backgroundColor: 'rgb(128,133,233)'}}></ColorBlock>
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "cotton.png"} style={{width: '10%', height: '2%', marginRight: '10%'}} alt='Cotton'/>
                Cotton
              </td>
            </tr>

            <tr>
              <td>
                <ColorBlock style={{backgroundColor: 'rgb(241,92,128)'}}></ColorBlock>
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "rice.png"} style={{width: '10%', height: '2%', marginRight: '10%'}} alt='Rice'/>
                Rice
              </td>
            </tr>
          </tbody>
        </table>
        
      </CardContentWrapper>
    </Arti>

  );
}

function getSuggestedCrops() {  
  return (

    <ArtiSuggest>
      <CardContentWrapper>
        
        <Title variant="subtitle2'" style={{fontSize: "16px", marginTop: '2%'}}>
          Suggested Crops
        </Title>

        <table color='primary'>
          <tbody>
            <tr>
              <td>
              <td style={{color: 'black', fontSize: '14px', fontWeight: '500'}}>
                VIC
              </td> 
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "barley.png"} style={{width: '10%', height: '2%', marginRight: '10%'}} alt='Barley'/>
              Barley
              </td>
            </tr>

            <tr>
              <td>
              <td style={{color: 'black', fontSize: '14px', fontWeight: '500'}}>
                QLD
              </td>
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "sorghum.png"} style={{width: '10%', height: '2%', marginRight: '10%'}} alt='Sorghum'/>
                Sorghum
              </td>
            </tr>

            <tr>
              <td>
              <td style={{color: 'black', fontSize: '14px', fontWeight: '500'}}>
                NSW
              </td>
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "rice.png"} style={{width: '10%', height: '2%', marginRight: '10%'}} alt='Rice'/>
                Rice
              </td>
            </tr>

            <tr>
              <td style={{color: 'black', fontSize: '14px', fontWeight: '500'}}>
                WA
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "barley.png"} style={{width: '10%', height: '2%', marginRight: '10%'}} alt='Barley'/>
                Barley
              </td>
            </tr>

            <tr>
              <td style={{color: 'black', fontSize: '14px', fontWeight: '500'}}>
                SA
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "barley.png"} style={{width: '10%', height: '2%', marginRight: '10%'}} alt='Barley'/>
                Barley
              </td>
            </tr>

            <tr>
              <td style={{color: 'black', fontSize: '14px', fontWeight: '500'}}>
                TAS
              </td>
              <td style={{color: 'black', fontSize: '14px', paddingLeft: '20px'}}>
              <img src={process.env.PUBLIC_URL + "wheat.png"} style={{width: '10%', height: '2%', marginRight: '10%'}} alt='Wheat'/>
                Wheat
              </td>
            </tr>
          </tbody>
        </table>
        
      </CardContentWrapper>
    </ArtiSuggest>

  );
}

export default function App({
  data = YieldData,
  mapStyle = 'mapbox://styles/mapbox/light-v10',
}) {

  const layers = [
    
    new ColumnLayer({
    id: 'column-layer1',
    data: data.filter(c => c.Crop === "Wheat"),
    diskResolution: 12,
    radius: 50000,
    extruded: true,
    pickable: true,
    elevationScale: 500,
    getPosition: d => [d.COORDINATES[0]-3.0, d.COORDINATES[1]],
    getFillColor: () => [92, 192, 192, 200],
    getLineColor: [0, 0, 0],
    getElevation: d => d.yield*175,
    
    
  }),
  new ColumnLayer({
    id: 'column-layer2',
    data: data.filter(c => c.Crop === "Barley"),
    diskResolution: 12,
    radius: 50000,
    extruded: true,
    pickable: true,
    elevationScale: 500,
    getPosition: d => [d.COORDINATES[0]-1.5, d.COORDINATES[1]],
    getFillColor: () => [67,67,72, 128],
    getLineColor: [0, 0, 0],
    getElevation: d => d.yield*175
  }),
  new ColumnLayer({
    id: 'column-layer3',
    data: data.filter(c => c.Crop === "Canola"),
    diskResolution: 12,
    radius: 50000,
    extruded: true,
    pickable: true,
    elevationScale: 500,
    getPosition: d => [d.COORDINATES[0], d.COORDINATES[1]],
    getFillColor: () => [144,237,125, 128],
    getLineColor: [0, 0, 0],
    getElevation: d => d.yield*175
  }),
  new ColumnLayer({
    id: 'column-layer4',
    data: data.filter(c => c.Crop === "Sorghum"),
    diskResolution: 12,
    radius: 50000,
    extruded: true,
    pickable: true,
    elevationScale: 500,
    getPosition: d => [d.COORDINATES[0]+1.5, d.COORDINATES[1]],
    getFillColor: () => [247,163,92, 128],
    getLineColor: [0, 0, 0],
    getElevation: d => d.yield*175
  }),
  new ColumnLayer({
    id: 'column-layer5',
    data: data.filter(c => c.Crop === "Cotton"),
    diskResolution: 12,
    radius: 50000,
    extruded: true,
    pickable: true,
    elevationScale: 500,
    getPosition: d => [d.COORDINATES[0]+3.0, d.COORDINATES[1]],
    getFillColor: () => [128,133,233, 128],
    getLineColor: [0, 0, 0],
    getElevation: d => d.yield*175
  }),
  new ColumnLayer({
    id: 'column-layer6',
    data: data.filter(c => c.Crop === "Rice"),
    diskResolution: 12,
    radius: 50000,
    extruded: true,
    pickable: true,
    elevationScale: 500,
    getPosition: d => [d.COORDINATES[0]+4.5, d.COORDINATES[1]],
    getFillColor: () => [241,92,128,128],
    getLineColor: [0, 0, 0],
    getElevation: d => d.yield*175
  }),
]

const [cropvalue, setCropValue] = React.useState('Wheat');

const handleCropChange = (event) => {
  setCropValue(event.target.value);
};

const DisplayCropTypes = () => {

  return (
    <PaperGridWrapper item sm={3} xs={12}>
      <PaperWrapper
        style={{
          backgroundColor: "rgb(255, 250, 250)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
          <Typography variant="h4" fontWeight={500} color="secondary">
              <Box fontWeight="fontWeightMedium" m={1}>
                Select Crop
              </Box>
          </Typography>
        {/* <InformationWrapper> */}
          <RadioGroup aria-label="Select Crop" name="crop" value={cropvalue} onChange={handleCropChange}>
          <Typography variant="h4" color="secondary">
          <img src={process.env.PUBLIC_URL + "wheat.png"} style={{width: '20px', height: '75px', marginRight: '2%'}} alt='Wheat'/>
            <FormControlLabel value="Wheat" control={<Radio />} label="Wheat" />
          </Typography>          
          <Typography variant="h4" color="secondary">
          <img src={process.env.PUBLIC_URL + "Barley.png"} style={{width: '20px', height: '75px', marginRight: '2%'}} alt='Barley'/>
            <FormControlLabel value="Barley" control={<Radio />} label="Barley" />
          </Typography>
          <Typography variant="h4" color="secondary">
          <img src={process.env.PUBLIC_URL + "Canola.png"} style={{width: '20px', height: '75px', marginRight: '2%'}} alt='Canola'/>
            <FormControlLabel value="Canola" control={<Radio />} label="Canola" />
          </Typography>
          <Typography variant="h4" color="secondary">
          <img src={process.env.PUBLIC_URL + "Sorghum.png"} style={{width: '20px', height: '75px', marginRight: '2%'}} alt='Sorghum'/>
            <FormControlLabel value="Sorghum" control={<Radio />} label="Sorghum" />
          </Typography>
          <Typography variant="h4" color="secondary">
          <img src={process.env.PUBLIC_URL + "Cotton.png"} style={{width: '20px', height: '75px', marginRight: '2%'}} alt='Cotton'/>
            <FormControlLabel value="Cotton" control={<Radio />} label="Cotton" />
          </Typography>
          <Typography variant="h4" color="secondary">
          <img src={process.env.PUBLIC_URL + "Rice.png"} style={{width: '20px', height: '75px', marginRight: '2%'}} alt='Rice'/>
            <FormControlLabel value="Rice" control={<Radio />} label="Rice" />
          </Typography>
          </RadioGroup>
        {/* </InformationWrapper> */}
      </PaperWrapper>
    </PaperGridWrapper>
  );
};

const theme = useTheme();
const [value, setValue] = React.useState(0);
const handleChange = (event, newValue) => {
  setValue(newValue);
};
// const handleChangeIndex = (index) => {
//   setValue(index);
// };

const DisplayVisualComponent = () => {
  
  return (

    <ComponentGrid container spacing={4}>
      {DisplayCropTypes()}

    

        <PaperGridWrapper item sm={9} xs={12}>
          <PaperWrapper>
          <SecondTitle color="secondary" variant="h4">
            Winter and Summer Crop Statistics
          </SecondTitle>
          <AppBar position="static" color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          style={{color: '#A64942'}} 
          variant="fullWidth"
          aria-label="Insights graphs"
        >
          <Tab label="Yields" {...a11yProps(0)}/>
          <Tab label="Profits" {...a11yProps(1)} />
          <Tab label="Recommendations" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        // onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <Timeseries value={cropvalue}/>        
        <p style={{color: 'black', marginBottom: '1%'}}>
        According to Bureau of Meteorology, around 22 million hectares are planted annually to commercial grain crops across Australia. 
        Climate/weather patterns effectively split Australia into two major grain cropping regions — northern and southern — and two crop growing periods — winter and summer.
        
        </p>

        <table>
          <tbody>
            <tr>
              <td>
                <p style={{color: 'black'}}> 
                <b>The northern region</b> takes in central and southern Qld through to northern NSW down as far as the Dubbo region.
                Most extreme weather in this region predicted over the summer months, allowing for dryland summer crop production.
                <br></br><br></br>
                Winter crops - Wheat, barley, canola.
                <br></br>
                Summer crops - Sorghum, cotton and peanuts.
                </p>
              </td>
              <td>
                <p style={{color: 'black'}}>
                <b>The southern region</b> stretches from central NSW (south of Dubbo) through to Victoria, Tasmania and South Australia and the southwest corner of Western Australia. 
                The weather pattern ranges from uniform in central NSW through to winter-dominant in Victoria, Tasmania, SA and WA.
                <br></br><br></br>
                Winter crops - Wheat, barley, canola.
                <br></br>
                Summer crops - Rice.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <Profitseries value={cropvalue}/>  
        <p style={{color: "black"}}></p>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <ComponentWrapper>
          <DeckGL initialViewState={INITIAL_VIEW_STATE} 
                controller={true} 
                layers={layers} 
                getTooltip={getTooltip}
                effects={[lightingEffect]} 
                >
          <StaticMap
            reuseMaps
            mapStyle={mapStyle}
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
          <table style={{tableLayout: 'fixed', width: '100%'}}>
            <tbody>
              <tr>
                <td style={{width: '50%'}}>
                {getSuggestedCrops()}               
                </td>
                <td style={{width: '50%'}}>
                {getLegend()}
                </td>
              </tr>
            </tbody>
          </table>
          
          
        </DeckGL>
        </ComponentWrapper>
        <p style={{color: 'black', marginTop: "5px"}}>
           The map shows the predicted yield and crop suggestion for the farmers from the selected Summer and Winter Crops in the year <b>2021</b> within every region of Australia.
        </p>
        </TabPanel>
      </SwipeableViews>
          </PaperWrapper>
        </PaperGridWrapper>
      </ComponentGrid>
      
  );
};


  return (
    <Fragment>
      
      {serviceTemplate({
                title: "Visual Insights",
                childComponent: DisplayVisualComponent(),
                custom: true,
      })}

    </Fragment>

  );
}

export function renderToDOM(container) {
  render(<App />, container);
}