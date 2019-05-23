﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebcamMVC.Models.ViewModel
{
    public class BioMetricVM
    {
        public Nullable<long> ID { get; set; }
        public string RegistrationNumber { get; set; }
        public string FullName { get; set; }
        public string Photo { get; set; }
        public string FingerPrint { get; set; }
        public int iid { get; set; }
        public string ImagePath { get; set; }
        public string FingerPrintImagePath { get; set; }
    }
}