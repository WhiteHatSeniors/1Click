
const DownloadButton = ({id}) => {
  const handleDownload = () => {
    console.log(id)
    fetch(`/api/get-attendees-csv/${id}`) // Replace with your Flask backend endpoint
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.csv'); // Set the filename for the downloaded file
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error('Error downloading CSV:', error);
      });
  };

  return (
    <button
      className="block bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 rounded"
      onClick={handleDownload}
    >
      Download CSV
    </button>
  );
};

export default DownloadButton;
