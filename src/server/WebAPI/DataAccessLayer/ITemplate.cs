﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace WebAPI.DataAccessLayer
{
    public interface ITemplate
    {
        Regex MatchingRegex();

        DbRequest MakeDbRequest(string input, bool shouldShowAll);

        List<PersonJsonWrapper> ProcessPersonJsons(List<PersonJsonWrapper> personJsons);

<<<<<<< HEAD
        string getLookupField();
        string getLookupValue();


        string MetdataDisplayValue();
=======
        //string MetdataDisplayValue();

        object AddMetadata();
>>>>>>> origin/master
    }
}
