"use client"
import React, { useEffect, useState } from 'react';
import SwaggerEditor from 'swagger-editor';
import 'swagger-editor/dist/swagger-editor.css';
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import NavbarHeader from '../../../components/NavBar';

export default function UserProfile({ params }: any) {
  const [Decodedata, setDecodedata] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          fileid: params.id,
        };
        const queryString = new URLSearchParams(data).toString();
        const res = await axios.get(`/api/users/uploadfile?${queryString}`);
        setDecodedata(res.data.decodedContent);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const editor = SwaggerEditor({
      dom_id: '#swagger-editor-own',
      layout: 'EditorLayout',
    });

    editor.specActions.updateSpec(Decodedata);
  }, [Decodedata]);

  return (
    <div className="h-screen">
      <NavbarHeader/>
      <div className="h-screen" id="swagger-editor-own" />
    </div>
  );
}