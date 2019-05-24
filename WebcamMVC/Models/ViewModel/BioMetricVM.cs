using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebcamMVC.Models.ViewModel
{
    public class BioMetricVM
    {
        public Nullable<int> ID { get; set; }
        public string RegistrationNumber { get; set; }
        public string FullName { get; set; }
        public string ImagePath { get; set; }
        public string FingerPrint { get; set; }
        public string Userpic { get; set; }
        public string FingerPrintImagePath { get; set; }
        public int iid { get; set; }
        public string SerialNumber { get; set; }
        public Nullable<int> ImageHeight { get; set; }
        public Nullable<int> ImageWidth { get; set; }
        public Nullable<int> ImageDPI { get; set; }
        public Nullable<int> ImageQuality { get; set; }
        public Nullable<int> NFIQ { get; set; }
        public string TemplateBase64 { get; set; }
        public Nullable<int> WSQImageSize { get; set; }
        public string WSQImage { get; set; }
        public Nullable<int> tbl_RegistrationId { get; set; }

        public virtual tbl_Biometric tbl_Biometric { get; set; }
    }
}