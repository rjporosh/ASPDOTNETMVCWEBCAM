//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebcamMVC.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbl_Biometric
    {
        public tbl_Biometric()
        {
            this.tbl_Registration = new HashSet<tbl_Registration>();
        }
    
        public int Id { get; set; }
        public string SerialNumber { get; set; }
        public Nullable<int> ImageHeight { get; set; }
        public Nullable<int> ImageWidth { get; set; }
        public Nullable<int> ImageDPI { get; set; }
        public Nullable<int> ImageQuality { get; set; }
        public Nullable<int> NFIQ { get; set; }
        public string TemplateBase64 { get; set; }
        public Nullable<int> WSQImageSize { get; set; }
        public string WSQImage { get; set; }
    
        public virtual ICollection<tbl_Registration> tbl_Registration { get; set; }
    }
}