import { MongoClient } from 'mongodb';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://picsum.photos/600/601',
    address: '123 456 789',
    description: 'This is a first meetup',
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://picsum.photos/600/602',
    address: '123 456 789',
    description: 'This is a second meetup',
  },
  {
    id: 'm3',
    title: 'A Third Meetup',
    image: 'https://picsum.photos/600/603',
    address: '123 456 789',
    description: 'This is a third meetup',
  },
];
const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Test</title>
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://hung2:0t7FFV25uuUjlsJn@cluster1.lqx9j54.mongodb.net/?retryWrites=true&w=majority'
  );

  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
};

// export const getServerSideProps = (context) => {
//   const rq = context.req;
//   const rs = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export default HomePage;
