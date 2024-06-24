"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        {/* ------------------------------------------------------------------------------------------------------------ */}
        <form className="flex max-w-xl flex-col gap-4 bg-slate-400 p-10 rounded-md">
          <div className="flex gap-6">
            <div className="flex flex-col gap-4">
              
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="firstName" value="First Name" />
                </div>
                <TextInput id="firstName" type="text" placeholder="First Name" required />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="lastName" value="Last Name" />
                </div>
                <TextInput id="lastName" type="text" placeholder="Last Name" required />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Your email" />
                </div>
                <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="dateOfBirth" value="Date of Birth" />
                </div>
                <TextInput id="dateOfBirth" type="date" placeholder="Date of Birth" required />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="address" value="Address" />
                </div>
                <TextInput id="address" type="text" placeholder="Address" />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="phoneN" value="Phone number" />
                </div>
                <TextInput id="phoneN" type="text" placeholder="Phone number" />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Password" />
                </div>
                <TextInput id="password" type="password" placeholder="Password" required />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="confPass" value="Confirm Password" />
                </div>
                <TextInput id="confPass" type="password" placeholder="Confirm Password" required />
              </div>
            </div>
          </div>



          <Button type="submit">Submit</Button>

        </form>
        {/* ------------------------------------------------------------------------------------------------------------------------- */}
      </div>
    </main>
  );
}


// Form Requirements:
// First Name - REQUIRED
// Last Name - REQUIRED
// Email - REQUIRED
// Date of Birth - REQUIRED
// Address
// Phone number
// Password - REQUIRED
// Confirm Password - REQUIRED