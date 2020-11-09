let testName, testUrl = '';
const video = document.getElementById("video");
const TIME_ADJUSTMENT = 10;

const load = () => {
  fetchTests();
  document.getElementById('enteredTime').value = '';
}

//using https://cors-anywhere.herokuapp.com to bypass Cross Origin Header error
const fetchTests = async() => {
  const result = await fetch('https://cors-anywhere.herokuapp.com/https://vpe-static.bamgrid.com/sample-files/take-home-exam/test-streams.json');
    if (result.ok) {
      const tests = await result.json();
      console.log(tests);

      getTest(tests);

    } else {
      console.log(result);
    }
  }

const getTest = (tests) => {
  for (let index = 0; index < tests.streams.length; index++) {
    testName = tests.streams[index].title;
    testUrl = tests.streams[index].url;
    console.log('test ' + testName, testUrl);
    createListItems(testName, testUrl);
  }
}

const createListItems = (testName, testUrl) => {
    const node = document.createElement("li");
    const text = document.createTextNode(testName);
    const button = document.createElement("button");
    const buttonText = document.createTextNode("Load Tests");
    node.appendChild(text);
    node.append(button);
    button.setAttribute("id", testUrl);
    button.appendChild(buttonText);
    document.getElementById("testList").appendChild(node);


    document.getElementById(testUrl).addEventListener("click", function() {
      document.getElementById(testUrl).style.backgroundColor = '#729a71';
      video.setAttribute("src", testUrl);
      video.load();
      video.play();
    });

  }

  const playVideo = () => {
    video.play();
  }

  const pauseVideo = () => {
    video.pause();
  }

  const fastForward = () => {
    video.currentTime = video.currentTime + TIME_ADJUSTMENT;
  }

  const rewind = () => {
    video.currentTime = video.currentTime - TIME_ADJUSTMENT;
  }

  const desiredTime = (ele) => {
    if(event.key === 'Enter') {
      if(isNaN(ele.value)){
        video.pause();
        alert('Please enter a time in seconds. \n Example 1: 20 \n Example 2: 120');
        document.getElementById('enteredTime').value = '';
        video.play();
      }else {
        console.log(ele.value);
        video.currentTime = ele.value;
      }
    }
  }

  const desiredTimeSubmit = () => {
    const enteredTime = document.getElementById("enteredTime").value;
    if(isNaN(enteredTime)) {
      video.pause();
      alert('Please enter a time in seconds. \n Example 1: 20 \n Example 2: 120');
      document.getElementById('enteredTime').value = '';
      video.play();
    }else {
      video.currentTime = enteredTime;
    }
  }




