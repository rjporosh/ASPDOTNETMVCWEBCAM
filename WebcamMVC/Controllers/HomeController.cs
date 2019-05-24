using AutoMapper;
//using BioMetric.UranusCoreAPIServiceReference;
using WebcamMVC.Models;
using WebcamMVC.Models.ViewModel;
using WebcamMVC.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebcamMVC.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home


        private Bio_MetricRepository _Manager;

        public HomeController()
        {
            _Manager = new Bio_MetricRepository();
        }
        string message = "";
        bool status = false;


        [HttpGet]
        public ActionResult Index()
        {
            Session["val"] = "";
            return View();
        }

        [HttpPost]
        public ActionResult Index(string Imagename)
        {
            string sss = Session["val"].ToString();

            ViewBag.pic = "http://localhost:55694/WebImages/" + Session["val"].ToString();

            return View();
        }

        [HttpGet]
        public ActionResult Regstration()
        {
            if (Convert.ToString(Session["val"]) != string.Empty)
            {
                ViewBag.pic = "http://localhost:55694/WebImages/" + Session["val"].ToString();
            }
            else
            {
                ViewBag.pic = "../../WebImages/person.jpg";
            }
            return View();
        }



        public JsonResult Rebind()
        {
            string path = "http://localhost:55694/WebImages/" + Session["val"].ToString();
            
            return Json(path, JsonRequestBehavior.AllowGet);
        }


        public ActionResult Capture()
        {
            var stream = Request.InputStream;
            string dump;

            using (var reader = new StreamReader(stream))
            {
                dump = reader.ReadToEnd();

                DateTime nm = DateTime.Now;

                string date = nm.ToString("yyyymmddMMss");

                var path = Server.MapPath("~/WebImages/" + date + "test.jpg");
                
                System.IO.File.WriteAllBytes(path, String_To_Bytes2(dump));

                ViewData["path"] = date + "test.jpg";

                Session["val"] = date + "test.jpg";
            }

            return View("Index");
        }

        private byte[] String_To_Bytes2(string strInput)
        {
            int numBytes = (strInput.Length) / 2;

            byte[] bytes = new byte[numBytes];

            for (int x = 0; x < numBytes; ++x)
            {
                bytes[x] = Convert.ToByte(strInput.Substring(x * 2, 2), 16);
            }

            return bytes;
        }
        [HttpPost]

        public JsonResult Create([Bind] BioMetricVM vmObj)
        {



            
            int isSaved = 0;

            if (ModelState.IsValid)
            {


                var result = Mapper.Map<tbl_Registration>(vmObj);

                var stream = Request.InputStream;
                string dump;

                using (var reader = new StreamReader(stream))
                {
                    dump = reader.ReadToEnd();

                    DateTime nm = DateTime.Now;

                    string date = nm.ToString("yyyymmddMMss");

                    var path = Server.MapPath("~/WebImages/" + date + "test.jpg");
                   
                    System.IO.File.WriteAllBytes(path, String_To_Bytes2(dump));

                    ViewData["path"] = date + "test.jpg";

                    Session["val"] = date + "test.jpg";
                    vmObj.Userpic = path;
                }


                isSaved = _Manager.Add(result);
                if (isSaved > 0)
                {
                    status = true;
                    message = "Succesfully Registered";
                }
                else
                {
                    status = true;
                    message = "Error! Please try again.";
                }

                return new JsonResult { Data = new { status = status, message = message } };
            }

            else
            {
                //status = false;
                //message = "Data Allready Exsists !!!";
                var result = Mapper.Map<tbl_Registration>(vmObj);



                isSaved = _Manager.Add(result);
                if (isSaved > 0)
                {
                    status = true;
                    message = "Succesfully Registered";
                }
                else
                {
                    status = true;
                    message = "Error! Please try again.";
                }
                return new JsonResult { Data = new { status = status, message = message } };
            }




        }
       
        
    }
}
