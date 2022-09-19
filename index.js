const inputFileSelector = document.getElementById('fileSelector');
const inputField1 = document.querySelector('input[name=field1]');
const inputField2 = document.querySelector('input[name=field2]');
const inputField3 = document.querySelector('input[name=field3]');
const importButton = document.getElementById('importButton');
const exportButton = document.getElementById('exportButton');

inputFileSelector.addEventListener('change', function () {
  const file = this.files[0];
  const fileReader = new FileReader();

  fileReader.onload = () => {
    const data = JSON.parse(fileReader.result);

    inputField1.value = data.field1;
    inputField2.value = data.field2;
    inputField3.value = data.field3;
  };

  fileReader.readAsText(file);
});

importButton.addEventListener('click', function () {
  inputFileSelector.click();
});

exportButton.addEventListener('click', function () {
  const fileContentObject = {};

  fileContentObject[inputField1.getAttribute('name')] = inputField1.value;
  fileContentObject[inputField2.getAttribute('name')] = inputField2.value;
  fileContentObject[inputField3.getAttribute('name')] = inputField3.value;

  const a = document.createElement('a');
  const blob = new Blob([JSON.stringify(fileContentObject)], {
    type: 'application/json'
  });
  const url = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = 'config.json';
  a.style.display = 'none';

  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
});