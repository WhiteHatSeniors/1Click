const topicsArr = [
  'Sports',
  'Movies',
  'Books',
  'Politics',
  'Music',
  'Religion',
  'Hackathon',
  'Casual',
  'Social Cause',
  'Education',
  'Gaming',
  'Leisure',
  'Travel',
  'Adventure',
  'Health',
  'Mental Health',
  'Psychology',
  'Technical',
  'Productivity',
  'Networking',
  'Jobs',
  'Finance',
  'Art',
  'Dramas',
  'Comedy',
  'Startups',
  'Entrepreneurship',
  'Fitness',
  'Automobiles',
  'Fest',
  'College Fest',
  'Festival',
  'Meetup',
  'Birthday',
  'Party'
].sort();

const langArr = [
  'English',
  'Chinese',
  'Spanish',
  'French',
  'Arabic',
  'Russian',
  'Portuguese',
  'German',
  'Japanese',
  'Indonesian',
  'Italian',
  'Dutch',
  'Swedish',
  'Polish',
  'Norwegian',
  'Danish',
  'Finnish',
  'Greek',
  'Turkish',
  'Korean',
  'Hebrew',
  'Thai',
  'Vietnamese',
  'Hungarian',
  'Czech',
  'Slovak',
  'Romanian',
  'Croatian',
  'Bulgarian',
  'Serbian',
  'Slovenian',
  'Lithuanian',
  'Latvian',
  'Estonian',
  'Icelandic',
  'Maltese',
  'Hindi',
  'Bengali',
  'Telugu',
  'Marathi',
  'Tamil',
  'Urdu',
  'Gujarati',
  'Kannada',
  'Odia',
  'Malayalam',
  'Punjabi',
  'Assamese',
  'Maithili',
  'Sindhi',
  'Konkani',
  'Nepali',
  'Sanskrit',
  'Manipuri',
  'Dogri',
  'Bodo',
  'Santhali'
].sort();

const fieldsArr = [
  'name',
  'age',
  'email',
  'phone',
  'organization',
  'status',
  'gender',
  'description',
  'industry'
  // 'location'
];

export const languages = langArr.map((ele) => {
  return { key: ele };
});
export const topics = topicsArr.map((ele) => {
  return { key: ele };
});
export const fields = fieldsArr.map((ele) => {
  return { key: ele };
});

/*<select
                id="languages"
                className="w-full p-2 border border-gray-300 rounded"
                required
                multiple
                value={selectedLanguages}
                onChange={(e) => setSelectedLanguages(Array.from(e.target.selectedOptions, (option) => option.value))}
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
</select> */

/* <select
                id="genres"
                className="w-full p-2 border border-gray-300 rounded"
                required
                multiple
                value={selectedGenres}
                onChange={(e) => setSelectedGenres(Array.from(e.target.selectedOptions, (option) => option.value))}
              >
                <option value="fiction">Fiction</option>
                <option value="mystery">Mystery</option>
                <option value="romance">Romance</option>
              </select> */
