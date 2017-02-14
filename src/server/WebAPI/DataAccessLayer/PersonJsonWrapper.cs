﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebAPI.Models;

namespace WebAPI.DataAccessLayer
{
    // Converts a PersonFromDbWrapper object to a C# object that will be sent as
    // as JSON to the client.
    public class PersonJsonWrapper
    {
        public object JsonFromClient { get; set; }
        
        // These fields are exposed to enable sorting by them.
        public char Mail { get; set; }
        public string Name { get; set; }
        public bool IsMe { get; set; }

        private PersonFromDbWrapper person;

        public PersonJsonWrapper(PersonFromDbWrapper person)
        {
            this.person = person;

            this.IsMe = this.getIsMe();
            this.Name = person.GivenName;
            // Sort by the first character of the mail so we have all the
            // S emails before the M emails.
            this.Mail = person.Mail == null ? ' ' : person.Mail.FirstOrDefault();

            this.JsonFromClient = toJsonObject(person);
        }

        private object toJsonObject(PersonFromDbWrapper person)
        {
            // TODO(Josh): Some of these fields ar eonly here for
            // backwards-compatibility.
            return new
            {
                mispar_ishi = person.MisparIshi,
                name = this.getDisplayName(),
                mail = person.Mail,
                mobile = person.Mobile,
                long_work_title = person.LongWorkTitle,
                job_title = person.JobTitle,
                work_phone = person.WorkPhone,
                picture = this.getPictureString(),
                darga = person.Darga,
                birthday = this.getBirthdayDisplayString(),
                is_birthday_today = this.isBirthdayToday(),
                top_row = this.createTopRowJson(),
                bottom_row = this.createBottomRowJson(),
                tags = this.getTags(),
                is_me = this.IsMe,
                what_i_do = person.WhatIDo
                    
            };
        }

        private IEnumerable<object> createTopRowJson()
        {
            var objects = new List<object>();
            objects.maybeAddDisplayFieldObject("שם", this.getDisplayName());
            objects.maybeAddDisplayFieldObject("נייד", person.Mobile);
            objects.maybeAddDisplayFieldObject("תפקיד", person.LongWorkTitle);
            return objects;
        }

        private IEnumerable<object> createBottomRowJson()
        {
            var objects = new List<object>();
            objects.maybeAddDisplayFieldObject(
                "מס' עבודה", person.WorkPhone);
            objects.maybeAddDisplayFieldObject(
                "תיאור", person.JobTitle);
            objects.maybeAddDisplayFieldObject(
                "דרגה", person.Darga);
            objects.maybeAddDisplayFieldObject(
                "יום הולדת", this.getBirthdayDisplayString());
            objects.maybeAddDisplayFieldObject(
                "עבודה 2", person.OtherTelephone);
            objects.maybeAddDisplayFieldObject(
                "בית", person.HomePhone);
            objects.maybeAddDisplayFieldObject(
                "פקס", person.Fax);
            objects.maybeAddDisplayFieldObject(
                "מין", person.Sex);
            objects.maybeAddDisplayFieldObject(
                "מייל", person.Mail);
            return objects;
        }

        // The additional relevant fields that don't appear as part of the top or
        // bottom rows.
        private object createOtherFieldsJson()
        {
            return new
            {
                mail = person.Mail,
                picture = this.getPictureString(),
                is_birthday_today = this.isBirthdayToday(),
            };
        }

        private string getBirthdayDisplayString()
        {
            return person.BirthdayDisplayString;
        }

        private bool isBirthdayToday()
        {
            var today = DateTime.Today;
            // TODO(:Josh): Extract this because it is shared with the queryable extension class.
            var todayDispalayString = String.Format("{0}.{1}",
                today.Day.ToString("D2"),
                today.Month.ToString("D2"));
            var personBirthday = person.BirthdayDisplayString;
            return personBirthday != null
                && person.BirthdayDisplayString.Equals(todayDispalayString);
        }

        private string getPictureString()
        {
            return person.Picture != null ?
                Convert.ToBase64String(person.Picture.ToArray()) : "";
        }

        private List<object> getTags()
        {
            var factors = getFactors(person.Tags);
            return factors
                .Where(factor => TagToPrimeDictionary.PRIME_TO_TAG.ContainsKey(factor))
                .Select(factor => {
                    return TagToPrimeDictionary.PRIME_TO_TAG[factor].ToJson();
                })
                .ToList();
        }

        private IEnumerable<long> getFactors(long number)
        {
            var factors = new HashSet<long>();
            var i = 0;
            while (number > 1 && i < TagToPrimeDictionary.EXISTING_TAG_PRIMES.Count())
            {
                var currentPrime =
                    TagToPrimeDictionary.EXISTING_TAG_PRIMES.ElementAt(i);
                if (number % currentPrime == 0)
                {
                    number /= currentPrime;
                    factors.Add(currentPrime);
                    continue;
                }
                i++;
            }
            return factors.AsEnumerable();

        }

        private String getDisplayName() {
            return String.Format("{0} {1}", person.GivenName, person.Surname);
        }

        private bool getIsMe()
        {
            return CurrentMisparIshi.GetCurrentMisparIshi().Equals(person.MisparIshi);
        }
    }

    public static class JsonExtensions
    {
        public static void maybeAddDisplayFieldObject(
            this List<object> list,
            string name,
            string value)
        {
            if (value == null || value.Length == 0)
            {
                return;
            }
            list.Add(new { name, value });
        }

        public static object ToJson(this TagPrime tagPrime)
        {
            return new
            {
                tag = tagPrime.Tag,
                non_admins_can_edit = tagPrime.AllowNonAdminsToAdd
            };
        }
    
    }
}