import React from "react";
import loading from './loading.gif';
export const Spinner = ()=> {
        return (
            <div className="text-center">
                <img src={loading} alt="loading data" className="my-3"/>
            </div>
        )
    }