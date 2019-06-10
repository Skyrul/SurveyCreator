using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UASSurvey.Controllers
{
    public class SurveyListController : Controller
    {
        // GET: SurveyList
        public ActionResult SurveyList()
        {


            return View();
        }

        // GET: SurveyList/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: SurveyList/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: SurveyList/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: SurveyList/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: SurveyList/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: SurveyList/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: SurveyList/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
