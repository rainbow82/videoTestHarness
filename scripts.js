let testName, testUrl = '';
const video = document.getElementById("video");

const load = () => {
  fetchTests();
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
      alert('button clicked' + testUrl);
      document.getElementById(testUrl).style.backgroundColor = '#729a71';
      video.setAttribute("src", testUrl);
      video.load();
      video.play();

    });
    // buttonClicked();

  }

  //this is changing the last button color after click
  const buttonClicked = () => {
    document.getElementById(testUrl).addEventListener("click", function() {
      alert('button clicked' + testUrl);
      document.getElementById(testUrl).style.backgroundColor = '#729a71';
    });

  }





