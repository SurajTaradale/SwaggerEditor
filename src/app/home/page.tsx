import React from 'react'; // Import React if not already imported
import Card from '../../../components/card';
import { GetCollectionsByID } from '../../../controller/roles';
import Link from 'next/link';
import NavbarHeader from '../../../components/NavBar';

export default async function HomePage() {
  const CollectionsList = await GetCollectionsByID({id:""});
  console.log(CollectionsList);

  return (
    <div> {/* Enclosing div */}
    <NavbarHeader/>
      <div className="w-full p-4" style={{ backgroundColor: '#16395b' }}>
        <div className="container mx-auto w-full text-left">
          <p className="text-2xl font-500 text-white py-4 pt-0">What are you looking for?</p>
          <div className="w-full">
            <input type="search" placeholder="Filter services..." className="w-full p-2 rounded-md bg-white text-gray-800 focus:outline-none" />
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4 flex flex-wrap justify-center">
        {CollectionsList.collections?.map(collection => (
          <Link href={`/apidoc/${collection.id}`} key={collection.id} className="w-full sm:w-full md:w-1/2 lg:w-1/2 p-4">
          <div >
            <div className="bg-white p-4 rounded-md flex flex-row h-full gap-6 border border-solid border-gray-300">
              <p className="bg-indigo-600 p-4 text-white max-h-14">SW</p>
              <div className="flex-grow">
                <p className="text-blue-500 font-600 text-indigo-600">{collection.collectionname}</p>
                <p className="text-gray-600">{collection.filename}</p>
              </div>
            </div>
          </div>
          </Link>
          // <div key={collection.id} className="flex flex-wrap justify-center mt-10">
          //   <div className="p-4 max-w-sm">
          //     <div className="flex rounded-lg h-full bg-teal-400 p-8 flex-col">
          //       <div className="flex items-center mb-3">
          //         <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
          //           <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
          //             <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          //           </svg>
          //         </div>
          //         <h2 className="text-white text-lg font-medium">{collection.collectionname}</h2>
          //       </div>
          //       <div className="flex flex-col justify-between flex-grow">
          //         <p className="leading-relaxed text-base text-white">{collection.filename}</p>
          //         <Link className="mt-3 text-black hover:text-blue-600 inline-flex items-center" href="#">Learn More <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
          //           <path d="M5 12h14M12 5l7 7-7 7"></path>
          //         </svg></Link>
          //       </div>
          //     </div>
          //   </div>
          // </div>
        ))}
      </div>
    </div>
  );
}
