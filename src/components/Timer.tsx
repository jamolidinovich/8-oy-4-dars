import { useState, useEffect } from "react";
import musicFile from "../Дима Билан & Мари Краймбрери - It's My Life (Silver Ace Remix).mp3";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FaBars } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { IoPlaySkipBack } from "react-icons/io5";
import { IoPlaySkipForwardSharp } from "react-icons/io5";
import { AiFillSound } from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import { RiArrowGoBackFill } from "react-icons/ri";
import { GrLanguage } from "react-icons/gr";
import { BsThreeDots } from "react-icons/bs";

const Pomodoro: React.FC = () => {
  const [initialWorkMinutes] = useState<number>(25);
  const [initialRestMinutes] = useState<number>(5);
  const [initialSeconds] = useState<number>(0);

  const [minutes, setMinutes] = useState<number>(initialWorkMinutes);
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isResting, setIsResting] = useState<boolean>(false);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audio] = useState(new Audio(musicFile));

  let timer: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (isRunning) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timer!);
            setIsRunning(false);
            if (!isResting) {
              setIsResting(true);
              setIsPlaying(true);
            }
          } else {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    } else {
      clearInterval(timer!);
    }
    return () => clearInterval(timer!);
  }, [
    isRunning,
    minutes,
    seconds,
    isResting,
    initialWorkMinutes,
    initialSeconds,
  ]);

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isPlaying, audio]);

  const handleStartStop = () => {
    if (!isRunning) {
      setMinutes(initialWorkMinutes);
      setSeconds(initialSeconds);
    }
    setIsRunning(!isRunning);
    setIsPlaying(false);
  };

  const handleRest = () => {
    setIsResting(true);
    setMinutes(initialRestMinutes);
    setSeconds(initialSeconds);
    setIsRunning(true);
    setIsPlaying(false);
    setTimeout(() => {
      setIsResting(false);
      setIsPlaying(true);
    }, initialRestMinutes * 60000);
  };

  const formatTime = (time: number): string => {
    return time < 10 ? `0${time}` : `${time}`;
  };
  const [value, setValue] = React.useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [val, setVal] = React.useState<number>();
  const handleChangee = (_: Event, newValue: number | number[]) => {
    setVal(newValue as number);
  };
  const MAX = 100;
  const MIN = 0;
  const marks = [
    {
      value: MIN,
      label: "",
    },
    {
      value: MAX,
      label: "",
    },
  ];
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div
      className="w-[1200px]  justify-between mx-auto p-5 rounded-xl flex"
      style={{ textAlign: "center", border: "1px solid blue" }}
    >
      <div className="w-[850px] ">
        <div className="flex justify-between pt-3 items-center">
          <h1 className="text-2xl">Pomodoro Timer</h1>
          <div className="bg-blue-700 py-2 px-5 text-white rounded-lg">
            New Beta!
          </div>
        </div>
        <h2 className="text-xl font-bold">
          Why don't you take a challenge? 😒
        </h2>

        <div
          style={{
            marginLeft: "auto ",
            marginRight: "auto",
            width: "300px ",
            height: "500px",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
              className="flex w-[300px] "
            >
              <Tab
                value="one"
                label="Pomodoro"
                style={{ marginRight: "80px", color: "#2563EE" }}
              />
              <Tab value="two" label="Rest" style={{ color: "#059669" }} />
            </Tabs>
            {value === "one" && (
              <div
                className="w-[250px] bg-[#F7FAFF] h-[250px] rounded-full ml-5 mt-5"
                style={{ border: "4px solid #D3E0FB" }}
              >
                <div>
                  <h2 className="text-center pt-20 text-6xl text-blue-700 font-bold">{`${formatTime(
                    minutes
                  )}:${formatTime(seconds)}`}</h2>
                  <p className="text-blue-700">Level</p>
                  <h3 className="text-blue-700 font-bold">Popular</h3>
                </div>
                <div></div>

                <button
                  className="absolute mt-20 ml-[-140px] font-bold py-4 px-[120px] text-xl text-white rounded-3xl bg-blue-700"
                  onClick={handleStartStop}
                >
                  {isRunning ? "Stop" : "Start"}
                </button>
              </div>
            )}
            {value === "two" && (
              <div>
                <div
                  className="w-[250px] bg-[#F7FAFF] h-[250px] rounded-full ml-5 mt-5"
                  style={{ border: "4px solid #CDEAE1" }}
                >
                  <div>
                    <h2 className="text-center pt-20 text-6xl text-[#059669] font-bold">{`${formatTime(
                      minutes
                    )}:${formatTime(seconds)}`}</h2>
                    <p className="text-[#059669] mt-6">Level</p>
                    <h3 className="text-[#059669] font-bold mb-2">Popular</h3>
                  </div>
                  <div></div>
                  <button
                    className="absolute mt-20 ml-[-140px] font-bold py-4 px-[120px] text-xl text-white rounded-3xl bg-[#059669]"
                    onClick={handleRest}
                  >
                    {isRunning ? "Stop" : "Start"}
                  </button>
                </div>
              </div>
            )}
          </Box>
        </div>
        <div className=" items-center flex gap-3">
          <FaBars className="text-2xl" />

          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <FaPause className="text-2xl" />
            ) : (
              <FaPlay className="text-2xl" />
            )}
          </button>
          <IoPlaySkipBack className="text-xl"></IoPlaySkipBack>
          <IoPlaySkipForwardSharp className="text-xl"></IoPlaySkipForwardSharp>
          <AiFillSound color="black" className="text-xl" />
          <Box sx={{ width: 250, marginTop: "6px" }}>
            <Slider
              marks={marks}
              step={10}
              value={val}
              valueLabelDisplay="auto"
              onChange={handleChangee}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between" }}
            ></Box>
          </Box>
          <p className=" font-bold">Background music - Lofi 3</p>
        </div>
      </div>
      <div className="w-[1px] h-[560px] mt-20 bg-black"></div>
      <div className="w-[300px] h-[200px] ">
        <div>
          <ul className="flex justify-between mt-5">
            <li className="flex items-center font-bold">
              {" "}
              <VscSettings></VscSettings>Customize
            </li>
            <li className="flex items-center font-bold">
              <RiArrowGoBackFill></RiArrowGoBackFill>Restart session
            </li>
            <li className="flex items-center font-bold">
              <GrLanguage></GrLanguage>En
            </li>
          </ul>
        </div>
        <div>
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center gap-2">
              {" "}
              <h1 className="text-2xl font-bold ">Tasks</h1>
              <h1>0 </h1>
            </div>
            <BsThreeDots></BsThreeDots>
          </div>
          <div className="mt-5">
            <Button
              style={{
                width: "300px",

                padding: "20px",
                color: "black",
                border: "1px solid #CBD5E1",
              }}
              onClick={handleOpen}
            >
              + Add here the task you
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>

                <input type="text" placeholder="Task description" />
                <div className="flex items-center gap-3 mt-3">
                  <button className="py-1 px-3 text-white bg-blue-700 rounded-lg">
                    save
                  </button>
                  <button>Canel</button>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
