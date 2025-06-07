"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

const DealCountdown = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 my-20">
      <div className="flex flex-col gap-2 justify-center">
        <h3 className="text-3x3l font-bold">Deal Of The Month</h3>
        <p>
          Get ready for a shopping experience like never before with our Deals
          of the Month! Every purchase comes with exclusive perks and offers,
          making this month a celebration of savvy choices and amazing deals.
          Don&apos;t miss out! 🎁🛒
        </p>
        <ul className="grid grid-cols-4">
          <StatBox label="Days" value={1} />
          <StatBox label="Hours" value={1} />
          <StatBox label="Minutes" value={1} />
          <StatBox label="Seconds" value={1} />
        </ul>
        <div className="text-center">
          <Button asChild>
            <Link href="/search">View Products</Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          src={"/images/promo.jpg"}
          alt="promotion"
          width={300}
          height={200}
          className="my-10 md:my-0"
        />
      </div>
    </section>
  );
};

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className="p-4 w-full text-center">
    <p className="text-3xl">{value}</p>
    <p>{label}</p>
  </li>
);

export default DealCountdown;
